import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required:true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    likes: {
        type: Array,
        default:[]
    },
    numberOfLikes: {
        type: Number,
        default: 0
    }
},{timestamps:true})

export const CommentModel = mongoose.model('Comment',commentSchema)