import express from 'express'
import { json } from 'body-parser'
import { errorHandlerMiddleware } from './middleware/error-handler'
import { RouteNotFoundError } from './errors/route-not-found.error'
import mongoose from 'mongoose'
import { signupRouter } from './router/signup'

const app = express()
app.use(json())

app.use(signupRouter)

app.all(/(.*)/, async () => {
    throw new RouteNotFoundError()
})

app.use(errorHandlerMiddleware)

app.listen(3000, async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-clusterip-srv:27017/auth')
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
    console.log('Auth is running on port 3000!!')
})