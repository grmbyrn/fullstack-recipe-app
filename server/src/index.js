import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { config } from 'dotenv'

import {userRouter} from './routes/users.js'

const app = express()
config()

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });

console.log(process.env.DB_STRING)

app.use(express.json())
app.use(cors())

app.use('/auth', userRouter)

mongoose.connect('mongodb+srv://graemebyrne:carrermozart20@cluster0.ei6dhms.mongodb.net/recipes?retryWrites=true&w=majority')

app.listen(3002, () => console.log('Server Started'))