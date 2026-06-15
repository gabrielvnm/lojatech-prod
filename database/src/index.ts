
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
  : ['http://localhost:4200']

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
  // Look for frontend files in multiple possible locations
  const possiblePaths = [
    path.join(__dirname, '../../lojatech/dist/lojatech'),
    path.join(__dirname, '../lojatech/dist/lojatech'),
    path.join(process.cwd(), 'lojatech/dist/lojatech')
  ]
  
  let frontendPath = null
  for (const p of possiblePaths) {
    if (require('fs').existsSync(p)) {
      frontendPath = p
      console.log(`Found frontend at: ${p}`)
      break
    }
  }
  
  if (frontendPath) {
    app.use(express.static(frontendPath))
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(frontendPath, 'index.html'))
      }
    })
  } else {
    console.warn('Frontend dist not found')
  }
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

export default app