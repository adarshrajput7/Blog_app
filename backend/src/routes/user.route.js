import express from 'express'
import { login, logout, register } from '../controllers/user.controller.js'


const userRoutes = express.Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.get('/logout', logout)



export default userRoutes