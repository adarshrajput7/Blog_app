import { useNavigate } from "react-router-dom"
import { Bookmark, Heart } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { updateSingleBlog } from "@/redux/blogSlice"
import { FcLike } from "react-icons/fc"
import { useState, useEffect } from "react"

const BlogCard = ({ blog }) => {
    console.log("amal", blog);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(store => store.auth)

    const [isLikedByUser, setIsLikedByUser] = useState(false);
    const [likesCount, setLikesCount] = useState(blog?.likes?.length || 0);

    useEffect(() => {
        if (blog && user) {
            setIsLikedByUser(blog.likes?.includes(user._id) || false);
        }
        setLikesCount(blog?.likes?.length || 0);
    }, [blog, user]);

    const likeHandle = async (e) => {
        e.stopPropagation();

        if (!user) {
            toast.error("Please login to like blogs");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.post(
                `http://localhost:8000/api/v1/blog/${blog._id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                console.log(res.data.data.likesCount);

                // Update local state immediately for better UX
                setIsLikedByUser(prev => !prev);
                setLikesCount(prev => prev + (isLikedByUser ? -1 : 1));

                // Update Redux 
                dispatch(updateSingleBlog(res.data.blog));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log('Like/Unlike error:', error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div
            onClick={() => navigate(`/blog/${blog._id}`)}
            className="max-w-xl pb-3 rounded-2xl overflow-hidden p-1 flex flex-wrap h-105 justify-center items-center transition duration-300 hover:scale-105 hover:shadow-2xl shadow-xl relative bg-linear-to-br from-white/80 via-purple-50/80 to-blue-50/80 backdrop-blur-xl border border-white/90 cursor-pointer"
        >
            {/* Light Colorful Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-purple-200/30 via-pink-200/20 to-blue-200/30 backdrop-blur-xl rounded-2xl pointer-events-none"></div>

            <div className="w-full font-light relative z-10">
                {/* Thumbnail */}
                <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                        src={blog.thumbnail}
                        className='rounded-t-2xl w-full object-cover aspect-video transition duration-500 hover:scale-110'
                        alt="blog thumbnail"
                    />

                    <span className="absolute top-3 right-3 px-3 py-1 bg-linear-to-r from-purple-400/40 to-pink-400/40 backdrop-blur-xl border border-white/60 rounded-full text-gray-100 text-xs font-medium shadow-lg">
                        {blog.category}
                    </span>
                </div>

                {/* Content */}
                <div className="px-6 py-4 space-y-2">
                    {/* Meta Info */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="px-2 py-0.5 bg-white/60 backdrop-blur-md border border-white/50 rounded-full text-xs text-gray-700">
                            By {blog.author?.fullName || 'Unknown'}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-bold text-xl text-gray-800 line-clamp-2">
                        {blog.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-gray-600 text-sm line-clamp-2">
                        {blog.subtitle || blog.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/blog/${blog._id}`);
                            }}
                            className="px-5 py-2 bg-purple-500/20 backdrop-blur-xl border border-purple-400/30 rounded-full text-black text-sm font-medium hover:bg-purple-500/30 transition"
                        >
                            Read More →
                        </button>

                        <button
                            onClick={likeHandle}
                            className="p-2 cursor-pointer backdrop-blur-xl rounded-full transition flex items-center gap-2"
                        >
                            {isLikedByUser ? <FcLike size={20} /> : <Heart size={20} />}
                            <span>{likesCount}</span>
                        </button>

                        <button
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 backdrop-blur-xl rounded-full transition"
                        >
                            <Bookmark className="w-4 h-4 text-gray-500 hover:text-yellow-500 transition" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard