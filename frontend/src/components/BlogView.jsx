import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Heart } from "lucide-react"
import { Button } from "./ui/button"
import { FaRegBookmark, FaRegCommentAlt } from "react-icons/fa"
import { MdOutlineShare } from "react-icons/md";
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { updateSingleBlog } from "@/redux/blogSlice"
import { FcLike } from "react-icons/fc";

const BlogView = () => {

    const params = useParams()
    const blogId = params.blogId
    const { blog } = useSelector(store => store.blog)
    const { user } = useSelector(store => store.auth)  
    
    const selectedBlog = blog.find(b => b._id === blogId)  // ✅ .find use kar
    console.log('jis blog ko view kiya', selectedBlog)
    
    const [copied, setCopied] = useState(false);
    console.log("🚀 ~ BlogView ~ copied:", copied)
    const dispatch = useDispatch()

    
    const isLikedByUser = selectedBlog?.likes?.includes(user?._id)


    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: selectedBlog?.title,
                    text: selectedBlog?.description?.substring(0, 100),
                    url: window.location.href,
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    await navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }
            }
        } else {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const likeHandle = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/blog/${selectedBlog._id}`, {}, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            })
            if (res.data.success) {
                console.log(res.data.data.likesCount);
                // dispatch(setBlog(res.data.allBlogs))
                dispatch(updateSingleBlog(res.data.blog)) 
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log('like unliked ', error)
        }
    }

    if (!selectedBlog) {
        return <div className="p-10">Blog not found...</div>
    }

    return (
        <div className="h-screen overflow-y-auto">
            <div className="max-w-6xl mx-auto p-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<a href="#">Home</a>} />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<a href="#">Components</a>} />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{selectedBlog.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="pt-7">
                    <h1 className="text-3xl">{selectedBlog.title}</h1>
                    <div className="flex items-center justify-between">
                        <div className="mt-2 flex gap-2 items-center ">
                            <Avatar>
                                <AvatarImage src={selectedBlog.author.photoUrl} />
                            </Avatar>
                            <p>{selectedBlog.author.fullName}</p>
                        </div>
                        <h1 className="text-sm text-gray-500">Publised on:
                            {new Date(selectedBlog.createdAt).toLocaleString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </h1>
                    </div>
                    <div className="w-full h-63 sm:h-88 md:h-125  overflow-hidden py-3">
                        <img
                            src={selectedBlog.thumbnail}
                            className="w-full h-full object-cover rounded"
                            alt=""
                        />
                    </div>
                    <h1>{selectedBlog.subtitle}</h1>
                    <div
                        className="prose prose-lg max-w-none text-gray-900 py-3 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: selectedBlog.description || "No content available" }}
                    />
                    <div className="border-t-2 border-b-2 border-gray-400 py-2 flex justify-between">
                        <div>
                            {/* ✅ Heart button with conditional styling */}
                            {/* <Button 
                                variant="none" 
                                onClick={likeHandle}
                                className={`flex items-center gap-1 transition-all ${
                                    isLikedByUser 
                                        ? 'text-red-500' 
                                        : 'text-gray-600 hover:text-red-400'
                                }`}
                            >
                                <Heart 
                                    size={20}
                                    // fill={isLikedByUser ? 'currentColor' : 'none'}
                                    // strokeWidth={isLikedByUser ? 0 : 2}
                                />
                                <span>{selectedBlog?.likes?.length || 0}</span>
                            </Button> */}
                            <Button  variant="none" onClick={likeHandle}>{isLikedByUser ? <FcLike size={20}/> : <Heart size={20}/> }<span>{selectedBlog?.likes?.length || 0}</span></Button>

                            <Button variant="none">
                                <FaRegCommentAlt />
                                <span>
                                    {selectedBlog?.comments?.length || 0} Comments
                                </span>
                            </Button>
                        </div>
                        <div>
                            <Button variant="none"><FaRegBookmark /></Button>
                            <Button
                                variant="none"
                                onClick={handleShare}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <MdOutlineShare className="h-5 w-5 text-gray-600" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogView