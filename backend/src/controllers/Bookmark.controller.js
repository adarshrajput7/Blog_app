// import BlogModel from '../models/blogModel.js'
// import UserModel from '../models/userModel.js'

// // API 1: Bookmark/Unbookmark blog
// export const toggleBookmark = async (req, res) => {
//     try {
//         const { blogId } = req.params
//         const userId = req.user._id // Assuming you have auth middleware

//         // Check if blog exists
//         const blog = await BlogModel.findById(blogId)
//         if (!blog) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Blog not found"
//             })
//         }

//         // Get user
//         const user = await UserModel.findById(userId)
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             })
//         }

//         // Check if blog is already bookmarked
//         const isBookmarked = user.bookmarks.includes(blogId)

//         if (isBookmarked) {
//             // Remove from bookmarks (Unbookmark)
//             user.bookmarks = user.bookmarks.filter(
//                 id => id.toString() !== blogId.toString()
//             )
//             await user.save()
            
//             return res.status(200).json({
//                 success: true,
//                 message: "Blog unbookmarked successfully",
//                 isBookmarked: false
//             })
//         } else {
//             // Add to bookmarks (Bookmark)
//             user.bookmarks.push(blogId)
//             await user.save()
            
//             return res.status(200).json({
//                 success: true,
//                 message: "Blog bookmarked successfully",
//                 isBookmarked: true
//             })
//         }

//     } catch (error) {
//         console.error("Error in toggleBookmark:", error)
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: error.message
//         })
//     }
// }

// // API 2: Get all bookmarked blogs of a user
// export const getBookmarks = async (req, res) => {
//     try {
//         const userId = req.user._id

//         // Find user and populate bookmarks with blog details
//         const user = await UserModel.findById(userId)
//             .populate({
//                 path: 'bookmarks',
//                 populate: {
//                     path: 'author',
//                     select: 'fullName photoUrl'
//                 }
//             })
//             .select('bookmarks')

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             })
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Bookmarks fetched successfully",
//             bookmarks: user.bookmarks,
//             totalBookmarks: user.bookmarks.length
//         })

//     } catch (error) {
//         console.error("Error in getBookmarks:", error)
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: error.message
//         })
//     }
// }

// // Bonus API: Check if a blog is bookmarked by current user
// export const checkBookmarkStatus = async (req, res) => {
//     try {
//         const { blogId } = req.params
//         const userId = req.user._id

//         const user = await UserModel.findById(userId)
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             })
//         }

//         const isBookmarked = user.bookmarks.includes(blogId)

//         return res.status(200).json({
//             success: true,
//             isBookmarked
//         })

//     } catch (error) {
//         console.error("Error in checkBookmarkStatus:", error)
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: error.message
//         })
//     }
// }