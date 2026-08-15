import BlogModel from "../models/blog.model.js"
import { CommentModel } from "../models/comment.model.js"


export const createComment = async (req, res) => {
    try {
        const commentKarneWaleKiId = req.id
        const postId = req.params.id
        const { content } = req.body

        const blog = await BlogModel.findById(postId)

        if (!blog) {
            return res.status(404).json({
                message: 'Blog not found',
                success: false
            })
        }

        if (!content) {
            return res.status(400).json({ message: 'Text is required', success: false })
        }


        const comment = await CommentModel.create({
            content,
            userId: commentKarneWaleKiId,
            postId: postId
        })

        await comment.populate({
            path: 'userId',
            select: 'fullName photoUrl'
        })

        blog.comments.push(comment._id) //blog ke comment array me comments ki id dalni hai
        await blog.save()

        return res.status(200).json({
            message: "Comment added",
            comment, //Populate kiya hua comment bhejo,
            success: true
        })
    } catch (error) {
        console.error("🚀 ~ createComment ~ error:", error)
    }
}

export const getCommentsAllPost = async (req, res) => {
    try {
        const blogId = req.params.id

        const comments = await CommentModel.find({ postId: blogId }).populate({
            path: "userId",
            select: "fullName photoUrl"
        }).sort({ createAt: -1 })
        if (!comments) {
            return res.status(404).json({
                message: 'Text is required',
                success: true
            })
        }

        return res.status(200).json({
            comments,
            success: true
        })
    } catch (error) {
        console.error("🚀 ~ getCommentsAllPost ~ error:", error)

    }
}


export const deleteComment = async (req, res) => {
    try {
        const authorId = req.id
        const commentId = req.params.id //comment ki id

        const comment = await CommentModel.findById(commentId)
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found',
                success: false
            })
        }

        if (comment.userId.toString() !== authorId) { //jo comment me user ki id hai vo req.id ke barabar h ya na
            return res.status(403).json({
                message: 'Unautorized to delete this comment',
                success: false
            })
        }

        const blogId = comment.userId

        await CommentModel.findByIdAndDelete(commentId) //comment delete 

        await BlogModel.findByIdAndUpdate(blogId, { $pull: { comments: commentId } }) //blog me comment arry se commets ki id pull/delete

        return res.status(200).json({
            message: 'Comment deleted successfully',
            success: true
        })

    } catch (error) {
        console.error("🚀 ~ deleteComment ~ error:", error)
        return res.status(500).json({
            message: 'Error deleting comment',
            success: false
        })
    }
}

export const editComment = async (req, res) => {
    try {
        const userId = req.id
        const commentId = req.params.id
        const { content } = req.body

        const comment = await CommentModel.findById(commentId)
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found',
                success: false
            })
        }
        //check if user own comment
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({
                message: 'Not authorized to edit this comment',
                success: false
            })
        }

        comment.content = content
        comment.updatedAt = new Date()
        await comment.save()

        return res.status(200).json({
            message: 'Comment updated successfully',
            success: true,
            comment
        })

    } catch (error) {
        console.log("editComment ,error", error)
        return res.status(500).json({
            message: 'Comment is not edited',
            success: false,
            error: error.message
        })
    }
}

export const likeComment = async (req, res) => {
    try {
        const userId = req.id
        const commentId = req.params.id

        const comment = await CommentModel.findById(commentId).populate("userId")
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found',
                success: false
            })
        }

        const alreadyLiked = comment.likes.includes(userId)
        if (alreadyLiked) {
            // if user like, then unlike it
            comment.likes = comment.likes.filter(
                id => id.toString() !== userId.toString());
            comment.numberOfLikes -= 1

        } else {
            //if user not like then like it
            comment.likes.push(userId)
            comment.numberOfLikes += 1
        }

        await comment.save({ timestamps: false })
        return res.status(200).json({
            success: true,
            message: alreadyLiked ? "Comment unliked" : "Comment Liked",
            updatedComment: comment
        })
    } catch (error) {
        console.error("🚀 ~ likeComment ~ error:", error)
    }
}

export const gatMyOwnAllComments = async (req, res) => {
    try {
        const userId = req.id
        const myBlogs = await BlogModel.find({ author: userId }).select('_id')
        const blogIds = myBlogs.map(blog => blog._id)

        if (!myBlogs || blogIds.length === 0) {
            return res.status(200).json({
                success: true,
                totalComments: 0,
                comments: [],
                message: 'No blogs found for this user'
            })
        }

        const comments = await CommentModel.find({ postId: { $in: blogIds } })
            .populate("userId", "fullName")
            .populate("postId", "title")

        return res.status(200).json({
            success: true,
            comments,
            totalComments: comments.length
        })

    } catch (error) {
        console.error("🚀 ~ getAllCommentsOnMyBlogs ~ error:", error)
        return res.status(500).json({
            message: 'failed to get comments',
            success: false,
            error:error.message
        })
    }
}