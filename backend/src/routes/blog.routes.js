import express from 'express'
import { isAuthenticated } from '../middleware/isAuthanticat.js'
import { singleUpload } from '../middleware/multer.js'
import { createBlog, updateBlog } from '../controllers/blog.controller.js'


const blogRoutes = express.Router()


blogRoutes.post('/', isAuthenticated,createBlog)
blogRoutes.put('/:blogId', isAuthenticated,singleUpload,updateBlog)



export default blogRoutes