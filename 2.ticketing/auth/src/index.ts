import express from 'express'
import { json } from 'body-parser'
import { errorHandlerMiddleware } from './middleware/error-handler'
import { RouteNotFoundError } from './errors/route-not-found.error'

const app = express()
app.use(json())


app.all(/(.*)/, () => {
    throw new RouteNotFoundError()
})

app.use(errorHandlerMiddleware)

app.listen(3000, () => {
    console.log('Auth is running on port 3000!')
})