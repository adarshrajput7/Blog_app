import express from 'express'
import { getAllUsers, login, logout, register, updateProfile } from '../controllers/user.controller.js'
import { isAuthenticated } from '../middleware/isAuthanticat.js'
import { singleUpload } from '../middleware/multer.js'


const userRoutes = express.Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.get('/logout', logout)
userRoutes.put('/profile/update', isAuthenticated,singleUpload,updateProfile)
userRoutes.get('/all-users', getAllUsers)



export default userRoutes