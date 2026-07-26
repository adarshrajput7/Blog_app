import express, { json } from 'express'
import userRoutes from './routes/user.route.js'
import cookieparser from 'cookie-parser'


const app = express()
app.use(express.json())
app.use(cookieparser())

app.use('/api/v1/user',userRoutes)



export default app