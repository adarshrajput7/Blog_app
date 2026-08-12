import express from 'express'
import { isAuthenticated } from '../middleware/isAuthanticat.js'
import { singleUpload } from '../middleware/multer.js'
import { createBlog, deleteBlog, getBlogWithLikeStatus, getOwnBlogs, getPublishedBlog, likeUnlike, updateBlog } from '../controllers/blog.controller.js'


const blogRoutes = express.Router()


blogRoutes.post('/', isAuthenticated,createBlog)
blogRoutes.put('/:blogId', isAuthenticated,singleUpload,updateBlog)
blogRoutes.get('/get-own-blogs', isAuthenticated,getOwnBlogs)
blogRoutes.delete('/delete/:id', isAuthenticated, deleteBlog)


// / Like/Unlike toggle (protected route)
blogRoutes.post('/:blogId', isAuthenticated, likeUnlike);

// Get blog with like status (protected route)
blogRoutes.get('/:blogId/status', isAuthenticated, getBlogWithLikeStatus);

blogRoutes.get('/get-publishhed-blogs', isAuthenticated, getPublishedBlog)




export default blogRoutes