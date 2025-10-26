import express from 'express'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { currentUserMiddleware, errorHandlerMiddleware, RouteNotFoundError } from '@mokatickets/common'
import { createTicketRouter } from './routes/new'
import { showTicketRouter } from './routes/show'
import { indexTicketRouter } from './routes'
import { updateTicketRouter } from './routes/update'

const app = express()
app.set('trust proxy', true)

app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
)

app.use(currentUserMiddleware)

app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

app.all(/(.*)/, async () => {
    throw new RouteNotFoundError()
})

app.use(errorHandlerMiddleware)

export { app }