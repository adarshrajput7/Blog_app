import express, { json } from 'express'
import userRoutes from './routes/user.route.js'
import cookieparser from 'cookie-parser'
import cors from 'cors'
import blogRoutes from './routes/blog.routes.js'
import commentRouter from './routes/comment.route.js'
import path from 'path'


const app = express()
app.use(express.json())
app.use(cookieparser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // ✅ Add this - Important for cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const _dirname = path.resolve()


app.use('/api/v1/user',userRoutes)
app.use('/api/v1/blog', blogRoutes)
app.use('/api/v1/comment', commentRouter)


app.use(express.static(path.join(_dirname,"/frontend/dist")))

// app.get('*', (_, res) => {
//     res.sendFile(path.resolve,"frontend", "dist", "index.html")
// })



export default app