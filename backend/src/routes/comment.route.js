import express from 'express'
import { isAuthenticated } from '../middleware/isAuthanticat.js'
import { createComment, deleteComment, editComment, gatMyOwnAllComments, getCommentsAllPost, likeComment } from '../controllers/comment.controller.js'


const commentRouter = express.Router()


commentRouter.post('/:id/create', isAuthenticated,createComment)
commentRouter.get('/:id/all', getCommentsAllPost)
commentRouter.delete('/:id/delete', isAuthenticated,deleteComment)
commentRouter.put('/:id/edit', isAuthenticated,editComment)
commentRouter.get('/:id/like', isAuthenticated,likeComment)
commentRouter.get('/get-all-comments', isAuthenticated,gatMyOwnAllComments)




export default commentRouter