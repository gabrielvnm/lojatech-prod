// backend development
import express from 'express'
import cors from 'cors'
import produtosRouter from './routes/produtos.routes.js'
import authRouter from './routes/auth.routes.js'
import { authenticateToken } from './middleware/auth.middleware.js'
import path from 'path';
import { fileURLToPath } from 'url'

const app = express()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(cors())

// --- HEALTH CHECK ---
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// --- API ROUTES with /api prefix ---
app.use('/api/auth', authRouter)
app.use('/api/produtos', authenticateToken, produtosRouter)

// --- PRODUCTION: Serve Angular static files ---
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../../lojatech/dist/lojatech');
  console.log(`Serving static files from: ${staticPath}`);
  app.use(express.static(staticPath));
  
  // For any non-API routes, serve the Angular app
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
} else {
  // --- DEVELOPMENT: 404 handler for API routes only ---
  app.use((req, res) => {
    res.status(404).json({ 
      error: `Route ${req.method} ${req.url} not found`,
      availableRoutes: [
        'GET /health',
        'POST /api/auth/register',
        'POST /api/auth/login',
        'GET /api/produtos (requires auth token)',
        'POST /api/produtos (requires auth token)',
      ]
    })
  })
}

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`)
    console.log(`Auth API disponível em http://localhost:${port}/api/auth`)
    console.log(`Produtos API (protegida) em http://localhost:${port}/api/produtos`)
})