import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouters from './routes/authRoutes.js'
import urlRouters from './routes/urlsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
dotenv.config()

// Initializing server with Express
const server = express()
server.use(express.json())
server.use(cors())

//Routes
server.use([authRouters, urlRouters, usersRoutes])

//Opening port to express

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})