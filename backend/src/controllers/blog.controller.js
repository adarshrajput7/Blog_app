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
            //delete thumbnail from Cloud
            if (blog.thumbnail) {
                try {
                    const publicId = blog.thumbnail.split('/').pop().split('.')[0]
                    await cloudinary.uploader.destroy(`Blog/${publicId}`)
                    console.log('Old thumnail deleted')
                } catch (deleteError) {
                    console.log('Old thumnail not found')
                }
            }

            const fileUri = getDataUri(file)
            thumbnail = await cloudinary.uploader.upload(fileUri, {
                folder: "Blog"
            })
        }

        const updateData = { title, subtitle, description, category, author: req.id, thumbnail: thumbnail?.secure_url }
        blog = await BlogModel.findByIdAndUpdate(blogId, updateData, { returnDocument: 'after' })

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

export const getOwnBlogs = async (req, res) => {
    try {
        const userId = req.id
        console.log(req.id);

        if (!userId) {
            return res.status(401).json({
                message: "user id is required",
                success: false
            })
        }
        const blogs = await BlogModel.find({ author: userId }).populate({
            path: 'author',
            select: 'fullName photoUrl'
        })

        if (!blogs) {
            return res.status(401).json({
                message: "No blogs post by user",
                blogs: [],
                success: false
            })
        }
        return res.status(200).json({ blogs, success: true })
    } catch (error) {
        console.log('get own blogs backend', error)
        return res.status(500).json({
            message: "No Blogs Founds"
        })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        const userId = req.id
        const blog = await BlogModel.findById(blogId)
        if (!blog) {
            return res.status(401).json({ message: 'blog not found', success: false })
        }
        if (blog.author.toString() !== userId) {
            return res.status(401).json({ message: 'Unauthorized to delete thi blog', success: false })
        }

        // ✅ Delete thumbnail from Cloudinary (same logic like update)
        if (blog.thumbnail) {
            try {
                const publicId = blog.thumbnail.split('/').pop().split('.')[0]
                await cloudinary.uploader.destroy(`Blog/${publicId}`)
                console.log('Old thumbnail deleted from Cloudinary')
            } catch (deleteError) {
                console.log('⚠️ Thumbnail not found on Cloudinary, continuing deletion')
            }
        }

        await BlogModel.findByIdAndDelete(blogId)
        return res.status(201).json({ message: 'Blog Deleted Successfully', success: true })

    } catch (error) {
        return res.status(500).json({ message: 'Error deleteing blog', success: false })

    }
}