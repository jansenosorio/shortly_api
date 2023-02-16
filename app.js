import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

// Initializing server with Express
const server = express()
server.use(express.json())
server.use(cors())

//Routes
// server.use(['routesHere'])

//Opening port to express

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`)
})