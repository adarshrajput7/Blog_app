import mongoose from "mongoose"
import BlogModel from "../models/blog.model.js"
import cloudinary from "../service/cloudinary.js"
import getDataUri from "../service/datauri.js"
import { CommentModel } from "../models/comment.model.js"


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



        // Delete thumbnail from Cloudinary (same logic like update)
        if (blog.thumbnail) {
            try {
                const publicId = blog.thumbnail.split('/').pop().split('.')[0]
                await cloudinary.uploader.destroy(`Blogs/${publicId}`)
                console.log('Old thumbnail deleted from Cloudinary')
            } catch (deleteError) {
                console.log('⚠️ Thumbnail not found on Cloudinary, continuing deletion')
            }
        }

        //Delete all commets, jis post ko delete kar rahe hai uske comments bhi delete  ho jane chahiye jo commets me me mongoDB me
         if (blog.comments && blog.comments.length > 0) {
            await CommentModel.deleteMany({ _id: { $in: blog.comments } })
        }

        await BlogModel.findByIdAndDelete(blogId)
        return res.status(201).json({ message: 'Blog Deleted Successfully', success: true })

    } catch (error) {
        return res.status(500).json({ message: 'Error deleteing blog', success: false })

    }
}

export const likeUnlike = async (req, res) => {
    try {
        const blogId = req.params.blogId  
        const userId = req.id
        console.log('blog id',blogId,'user id',userId);
        
        // Validate blog ID
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog ID"
            });
        }
        const blog = await BlogModel.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        const alreadyLiked = blog.likes.includes(userId)
        if (alreadyLiked) {
            // Unlike: Remove user from likes array
            blog.likes = blog.likes.filter(
                id => id.toString() !== userId.toString()
            );
        } else {
            blog.likes.push(userId)
        }
        await blog.save()
        const allBlogs = await BlogModel.find();
        return res.status(200).json({
            success: true,
            message: alreadyLiked ? "Blog unliked" : "Blog liked",
            data: {
                likesCount: blog.likes.length,
                isLiked: !alreadyLiked
            },
            allBlogs,
            blog
        });

    } catch (error) {
        console.error("Error in toggleLike:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export const getBlogWithLikeStatus = async () => {
    try {
        const blogId = req.params
        const userId = req.id
        const blog = await BlogModel.findById(blogId).populate('author', 'fullName').lean()
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            });
        }

        const isLiked = userId && blog.likes.some(
            id => id.toString() === userId.toString()
        );

        return res.status(200).json({
            success: true,
            data: {
                ...blog,
                likesCount: blog.likes.length,
                isLiked: isLiked || false
            }
        });
    } catch (error) {
         console.error("Error in getBlogWithLikeStatus:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// export const getPublishedBlog = async (req, res) => {
//     try {
//         const blogs = await BlogModel.find({ isPublished: true }).sort({ createdAt: -1 }).populate({ path: "author", select: "fullName photoUrl" })
//         if (!blogs) {
//             return  res.status(401).json({
//                 message: 'Blogs not found',
//                 success:false
//         })
//         }
//         return  res.status(200).json({
//             message: 'Blog Published',
//             success: true, 
//             blogs
//         })
//     } catch (error) {
//         return  res.status(500).json({
//             message:'Failed to get Published Blog'
//         })
//     }
// }




//+++++++++++++++++++++

// export const getPublishedBlog = async (req, res) => {
//     try {
//         // Schema mein "isPublisihed" hai toh wahi use karein
//         const blogs = await BlogModel.find({ isPublished: false }) 
//             .sort({ createdAt: -1 })
//             .populate({ path: "author", select: "fullName photoUrl" })
            
//         if (!blogs || blogs.length === 0) {
//             return res.status(404).json({
//                 message: 'No unpublished blogs found',
//                 success: false
//             })
//         }
        
//         return res.status(200).json({
//             message: 'Unpublished blogs fetched successfully',
//             success: true, 
//             blogs,
//             blogs_len:blogs.length
//         })
//     } catch (error) {
//         console.error(error); // Debugging ke liye
//         return res.status(500).json({
//             message: 'Failed to get unpublished blogs',
//             error: error.message,
//             success: false
//         })
//     }
// }



export const getPublishedBlog = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const blogs = await BlogModel.find({ isPublished: false })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: "author",
                select: "fullName photoUrl"
            });

        const totalBlogs = await BlogModel.countDocuments({
            isPublished: false
        });

        return res.status(200).json({
            message: "Blogs fetched successfully",
            success: true,
            blogs,
            blogs_len: blogs.length,
            currentPage: page,
            totalBlogs,
            hasMore: skip + blogs.length < totalBlogs
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to get blogs",
            error: error.message,
            success: false
        });
    }
};



