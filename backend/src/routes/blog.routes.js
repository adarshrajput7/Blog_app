import express from 'express'
import { isAuthenticated } from '../middleware/isAuthanticat.js'
import { singleUpload } from '../middleware/multer.js'
import { createBlog, deleteBlog, getOwnBlogs, updateBlog } from '../controllers/blog.controller.js'


const blogRoutes = express.Router()


blogRoutes.post('/', isAuthenticated,createBlog)
blogRoutes.put('/:blogId', isAuthenticated,singleUpload,updateBlog)
blogRoutes.get('/get-own-blogs', isAuthenticated,getOwnBlogs)
blogRoutes.delete('/delete/:id', isAuthenticated,deleteBlog)



export default blogRoutes