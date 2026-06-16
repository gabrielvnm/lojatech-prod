// backend production

// import express from 'express'
// import produtosRouter from './routes/produtos.routes.js'
// import cors from 'cors'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const app = express()
// const port = 3000

// app.use(express.json())
// app.use(cors())

// app.use(express.static(path.join(__dirname, '../public')))
// app.use('/produtos', produtosRouter)

// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, '../public', 'index.html'))
// })

// app.listen(port, () => {
//     console.log(`Servidor rodando em http://localhost:${port}`)
// })

// backend development

import express from 'express'
import cors from 'cors'
import produtosRouter from './routes/produtos.routes.js'
import authRouter from './routes/auth.routes.js'
import { authenticateToken } from './middleware/auth.middleware.js'

const app = express()
const port = 3000


app.use(express.json())
app.use(cors())  


app.use('/auth', authRouter)


app.use('/produtos', authenticateToken, produtosRouter)


app.use((req, res) => {
  res.status(404).json({ 
    error: `Route ${req.method} ${req.url} not found`,
    availableRoutes: [
      'POST /auth/register',
      'POST /auth/login',
      'GET /produtos (requires auth token)',
      'POST /produtos (requires auth token)',
      
    ]
  })
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log(`Auth API disponível em http://localhost:${port}/auth`)
    console.log(`Produtos API (protegida) em http://localhost:${port}/produtos`)
})