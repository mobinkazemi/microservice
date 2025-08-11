import express from 'express'
import { json } from 'body-parser'
import { errorHandlerMiddleware } from './middleware/error-handler'
import { RouteNotFoundError } from './errors/route-not-found.error'
import mongoose from 'mongoose'
import { signupRouter } from './router/signup'
import cookieSession from 'cookie-session'
import { signinRouter } from './router/signin'

const app = express()
app.set('trust proxy', true)

app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
)
app.use(signupRouter)
app.use(signinRouter)

app.all(/(.*)/, async () => {
    throw new RouteNotFoundError()
})

app.use(errorHandlerMiddleware)

app.listen(3000, async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY env not defined')
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-clusterip-srv:27017/auth')
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
    console.log('Auth is running on port 3000!!')
})