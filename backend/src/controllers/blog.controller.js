import BlogModel from "../models/blog.model.js"
import cloudinary from "../service/cloudinary.js"
import getDataUri from "../service/datauri.js"


export const createBlog = async (req, res) => {
    try {
        const { title, category } = req.body

        if (!title || !category) {
            return res.status(400).json({
                message: 'Blog title and category is required',
                success: false
            })
        }

        const blog = await BlogModel.create({
            title,
            category,
            author: req.id
        })

        return res.status(201).json({
            message: 'Blog Created successfully',
            success: true,
            blog
        })


    } catch (error) {
        console.log('create blog ladle', error)
        return res.status(500).json({
            message: 'Failed to create blog',
            success: false
        })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId
        const { title, subtitle, description, category } = req.body
        const file = req.file

        let blog = await BlogModel.findById(blogId)

        if (!blog) {
            return res.status(500).json({
                message: 'Blog not found',
                success: false
            })
        }
        let thumbnail
        if (file) {
            const fileUri = getDataUri(file)
             thumbnail = await cloudinary.uploader.upload(fileUri, {
                folder:"Blog"
            })
        }

        const updateData = { title, subtitle, description, category, author: req.id, thumbnail: thumbnail?.secure_url }
        blog = await BlogModel.findByIdAndUpdate(blogId, updateData, { returnDocument: 'after' } )

        return res.status(201).json({
            message: 'Blog updated successfully',
            success: true,
            blog
        })



    } catch (error) {
        console.log('udate blog ladle', error)
        return res.status(500).json({
            message: 'Failed to update blog',
            success: false
        })
    }
}