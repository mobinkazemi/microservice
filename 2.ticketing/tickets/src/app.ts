import express from 'express'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandlerMiddleware, RouteNotFoundError } from '@mokatickets/common'

const app = express()
app.set('trust proxy', true)

app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
)


app.all(/(.*)/, async () => {
    throw new RouteNotFoundError()
})

app.use(errorHandlerMiddleware)

export { app }