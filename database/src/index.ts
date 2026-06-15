// backend development

// import express from 'express'
// import cors from 'cors'
// import produtosRouter from './routes/produtos.routes.js'
// import authRouter from './routes/auth.routes.js'
// import { authenticateToken } from './middleware/auth.middleware.js'

// const app = express()
// const port = 3000


// app.use(express.json())
// app.use(cors())  


// app.use('/auth', authRouter)


// app.use('/produtos', authenticateToken, produtosRouter)


// app.use((req, res) => {
//   res.status(404).json({ 
//     error: `Route ${req.method} ${req.url} not found`,
//     availableRoutes: [
//       'POST /auth/register',
//       'POST /auth/login',
//       'GET /produtos (requires auth token)',
//       'POST /produtos (requires auth token)',
      
//     ]
//   })
// })

// app.listen(port, () => {
//     console.log(`Servidor rodando em http://localhost:${port}`)
//     console.log(`Auth API disponível em http://localhost:${port}/auth`)
//     console.log(`Produtos API (protegida) em http://localhost:${port}/produtos`)
// })

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import produtosRouter from './routes/produtos.routes.js'
import authRouter from './routes/auth.routes.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:4200', 'https://lojatech-frontend.railway.app']

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())


app.use('/api/produtos', produtosRouter)
app.use('/api/auth', authRouter)


app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})


if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../../lojatech/dist/lojatech')
  app.use(express.static(frontendPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'))
  })
}


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})


app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` })
})

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 CORS enabled for: ${allowedOrigins.join(', ')}`)
})