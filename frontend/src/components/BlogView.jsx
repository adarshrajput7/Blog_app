import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdOutlineShare } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { updateSingleBlog } from "@/redux/blogSlice";
import { FcLike } from "react-icons/fc";
import CommentBox from "./CommentBox";
import { AnimatePresence, motion } from "framer-motion"
import BookmarkButton from "./BookmarkButton";

const BlogView = () => {
    const params = useParams();
    const blogId = params.blogId;
    const { blog } = useSelector((store) => store.blog);
    const { user } = useSelector((store) => store.auth);

    const navigate = useNavigate()

    const selectedBlog = blog.find((b) => b._id === blogId); // ✅ .find use kar
    console.log("jis blog ko view kiya", selectedBlog);

    const [copied, setCopied] = useState(false);
    console.log("🚀 ~ BlogView ~ copied:", copied);
    const dispatch = useDispatch();
    const [commentShow, setCommentShow] = useState(false);

    const isLikedByUser = selectedBlog?.likes?.includes(user?._id);
    const commentRef = useRef(null)


    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: selectedBlog?.title,
                    text: selectedBlog?.description?.substring(0, 100),
                    url: window.location.href,
                });
            } catch (error) {
                if (error.name !== "AbortError") {
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
        if (!user) {
                toast.error("Please login to like blogs");
                navigate("/login");
                return;
        }
        

        
        try {
            const res = await axios.post(
                `https://blog-app-sjs3.onrender.com//api/v1/blog/${selectedBlog._id}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                },
            );
            if (res.data.success) {
                console.log(res.data.data.likesCount);
                // dispatch(setBlog(res.data.allBlogs))
                dispatch(updateSingleBlog(res.data.blog));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log("like unliked ", error);
        }
    };

    if (!selectedBlog) {
        return <div className="p-10">Blog not found...</div>;
    }

    useEffect(() => {
        if (commentShow) {
            commentRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            })
        }
    }, [commentShow])

    return (
        <div className="">
            <div className="max-w-6xl mx-auto p-2 md:p-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<span onClick={()=>navigate('/') } className='cursor-pointer md:text-sm text-xs'>Home</span>} />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink render={<span onClick={()=>navigate('/blogs') } className='cursor-pointer md:text-sm text-xs'>All Blogs</span>} />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className='line-clamp-1 md:max-w-full max-w-60 overflow-hidden text-blue-500 md:text-sm text-xs'>{selectedBlog.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="md:pt-7 pt-4">
                    <h1 className="text-xl md:text-3xl font-serif">{selectedBlog.title}</h1>
                    <div className="flex items-center justify-between">
                        <div className="mt-2 flex gap-2 items-center ">
                            <Avatar>
                                <AvatarImage src={selectedBlog.author.photoUrl} />
                            </Avatar>
                            <p className="md:text-sm text-xs">{selectedBlog.author.fullName}</p>
                        </div>
                        <h1 className="text-xs md:text-sm text-gray-500">
                            Published on: 
                            {new Date(selectedBlog.createdAt).toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
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
                    <h1 className="text-gray-700 me:text-sm text-xs font-serif">{selectedBlog.subtitle}</h1>
                    <div
                        className="prose prose-lg max-w-none text-gray-900 py-3 text-sm md:text-xl leading-relaxed text-justify"
                        dangerouslySetInnerHTML={{
                            __html: selectedBlog.description || "No content available",
                        }}
                    />
                    <div className="border-t-2 border-b-2 border-gray-400 py-2 flex justify-between">
                        <div>
                            {/* ✅ Heart button with conditional styling */}
                            <Button variant="none" onClick={likeHandle}>
                                {isLikedByUser ? <FcLike size={20} /> : <Heart size={20} />}
                                <span>{selectedBlog?.likes?.length || 0}</span>
                            </Button>

                            <Button
                                variant="none"
                                onClick={() => {
                                    setCommentShow(prev => {
                                        const newValue = !prev

                                        if (newValue) {
                                            setTimeout(() => {
                                                commentRef.current?.scrollIntoView({
                                                    behavior: "smooth",
                                                    block: "start",
                                                })
                                            }, 100)
                                        }

                                        return newValue
                                    })
                                }}
                            >
                                <FaRegCommentAlt />
                                <span>
                                    {selectedBlog?.comments?.length || 0} Comments
                                </span>
                            </Button>
                        </div>
                        <div>
                            {/* <Button variant="none">
                                <FaRegBookmark />
                            </Button> */}
                            <BookmarkButton selectedBlog={ selectedBlog} />
                            <Button
                                variant="none"
                                onClick={handleShare}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <MdOutlineShare className="h-5 w-5 text-gray-600" />
                            </Button>
                        </div>
                    </div>


                    <AnimatePresence mode="wait">
                        {commentShow && (
                            <motion.div
                                ref={commentRef}
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                    scale: 0.95,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -30,
                                    scale: 0.97,
                                }}
                                transition={{
                                    duration: 0.45,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                <CommentBox selectedBlog={selectedBlog} />
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {/* <div
            className={`
        overflow-hidden
        transition-all
        duration-500
        ease-in-out
        ${
          commentShow
            ? "max-h-200 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4"
        }
    `}
          >
            <CommentBox selectedBlog={selectedBlog} />
          </div> */}

                    {/* {
                        commentShow && <CommentBox selectedBlog={ selectedBlog} /> 
                    } */}
                    {/* <CommentBox selectedBlog={ selectedBlog} /> */}
                </div>
            </div>
        </div>
    );
};

export default BlogView;
