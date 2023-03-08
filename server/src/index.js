import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { config } from 'dotenv'

import {userRouter} from './routes/users.js'
import {recipesRouter} from './routes/recipes.js'

const app = express()
config()

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });

app.use(express.json())
app.use(cors())

app.use('/auth', userRouter)
app.use('/recipes', recipesRouter)

app.listen(3002, () => console.log('Server Started'))