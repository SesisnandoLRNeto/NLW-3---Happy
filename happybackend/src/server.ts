import express from 'express'
import cors from 'cors'
import 'express-async-errors' //mostrar erros na req

import path from 'path'

import './database/connection'

import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads'))) //para exibir as imagens
app.use(errorHandler)

app.listen(3333)  