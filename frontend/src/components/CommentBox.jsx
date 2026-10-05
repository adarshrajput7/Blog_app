import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { useEffect, useState } from "react"
import axios from "axios"
import { setComment } from "@/redux/commentSlice"
import { setBlog } from "@/redux/blogSlice"
import { toast } from "react-toastify"
import { EllipsisVertical, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { FaEdit, FaRegHeart } from "react-icons/fa"
import { FcLike } from "react-icons/fc"
import { useNavigate } from "react-router-dom"



const CommentBox = ({ selectedBlog }) => {
    console.log("🚀 ~ CommentBox ~ selectedBlog:", selectedBlog)
    const { user } = useSelector(store => store.auth)
    console.log("🚀 ~ CommentBox ~ user:", user)
    const { blog } = useSelector(store => store.blog)
    const { comment } = useSelector(store => store.comment)
    const comments = Array.isArray(comment) ? comment : []
    const navigate = useNavigate()
    console.log("🚀 ~ CommentBox ~ comments:", comment)
    const [content, setContent] = useState('')
    const dispatch = useDispatch()
    console.log(content);
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editingContent, setEditingContent] = useState("")


    // const createCommentHandler = async () => {
    //     try {
    //         const res = await axios.post(`http://localhost:8000/api/v1/comment/${selectedBlog._id}/create`, { content }, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }, withCredentials: true
    //         })

    //         if (res.data.success) {
    //             let updatedComment;
    //             if (comment.length >= 1) {
    //                 updatedComment = [...comment, res.data.comment]
    //             } else { updatedComment = [res.data.comment] }
    //             dispatch(setComment(updatedComment))
    //             const updateBlogData = blog.map(blog => blog._id === selectedBlog._id ? { ...blog, comments: updatedComment } : blog)
    //             dispatch(setBlog(updateBlogData))
    //             toast.success(res.data.message)
    //             setContent("")
    //         }

    //     } catch (error) {
    //         console.error("🚀 ~ createCommentHandler ~ error:", error)
    //     }
    // }

    const createCommentHandler = async () => {
        try {
            const res = await axios.post(
                `http://localhost:8000/api/v1/comment/${selectedBlog._id}/create`,
                { content },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )

            if (res.data.success) {
                // Add new comment to comments state
                const updatedComments = [
                    ...comment,
                    res.data.comment
                ]

                dispatch(setComment(updatedComments))

                // Update blog's comment IDs
                const updatedBlogs = blog.map((item) =>
                    item._id === selectedBlog._id
                        ? {
                            ...item,
                            comments: [
                                ...item.comments,
                                res.data.comment._id
                            ]
                        }
                        : item
                )

                dispatch(setBlog(updatedBlogs))

                toast.success(res.data.message)
                setContent("")
            }

        } catch (error) {
            console.error("🚀 ~ createCommentHandler ~ error:", error)
            toast.error(
                error?.response?.data?.message || "Error creating comment"
            )
        }
    }

    const getCommentsAllPost = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/comment/${selectedBlog._id}/all`, {
                withCredentials: true
            })
            dispatch(setComment(res.data.comments))
        } catch (error) {
            console.error("🚀 ~ getCommentsAllPost ~ error:", error)
        }
    }

    const deleteComment = async (commentId) => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/comment/${commentId}/delete`, {
                withCredentials: true
            })

            // if (res.data.success) {
            //     const updatedComment = comment.filter((item) => item._id !== commentId)
            //     dispatch(setComment(updatedComment))
            //     toast.success(res.data.message)
            // }

            if (res.data.success) {

                const updatedComment = comment.filter(
                    (item) => item._id !== commentId
                )

                dispatch(setComment(updatedComment))

                const updateBlogData = blog.map(blog =>
                    blog._id === selectedBlog._id
                        ? {
                            ...blog,
                            comments: blog.comments.filter(
                                item => item.toString() !== commentId
                            )
                        }
                        : blog
                )

                dispatch(setBlog(updateBlogData))

                toast.success(res.data.message)
            }
        } catch (error) {
            console.error("🚀 ~ deleteComment ~ error:", error)
        }
    }


    const editCommentHandler = async (id) => {
        try {
            const res = await axios.put(`http://localhost:8000/api/v1/comment/${id}/edit`, { content: editingContent }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.data.success) {
                //update  varible comment me new comment bhi aad kar do
                const updatedCommentData = comment.map(item =>
                    item._id === id ? { ...item, content: editingContent,updatedAt: new Date().toISOString() } : item
                );
                dispatch(setComment(updatedCommentData))
                toast.success(res.data.message)
                setEditingCommentId(null)
                setEditingContent("")
            }
        } catch (error) {
            console.error("🚀 ~ editCommentHandler ~ error:", error)

        }
    }

    const likeCommentHandler = async (id) => {
        if (!user) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        try {
            const res = await axios.get(`http://localhost:8000/api/v1/comment/${id}/like`, { withCredentials: true })
            if (res.data.success) {
                const updatedComentData = res.data.updatedComment
                const updatedComentList = comment.map(item => item._id === id ? updatedComentData : item)
                dispatch(setComment(updatedComentList))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error("🚀 ~ likeCommentHndler ~ error:", error)
        }
    }

    useEffect(() => {
        getCommentsAllPost()
    }, [])

    return (
        <div className="py-2 flex justify-between mt-5 flex-col">
            {user ? (

                <div>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={user.photoUrl} />
                        </Avatar>
                        <h1>{user.fullName}</h1>
                    </div>
                    <Textarea
                        placeholder="Leave a comment"
                        className="my-2 border-2 border-gray-400 max-h-20 overflow-auto"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Button onClick={createCommentHandler}>Comment</Button>
                </div>
            ) : (
                <p className="text-gray-600">
                    Please login to comment. <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                </p>
            )}
            <Card className="mt-2">
                {
                    comments.map((item, index) => {
                        return <div className="p-2">
                            <div key={index} className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage src={item.userId.photoUrl} />
                                </Avatar>
                                {/* <h1>{item.userId.fullName} <span className="text-gray-500">{(() => { const s = (Date.now() - new Date(item.createdAt)) / 1000; return s < 60 ? `${Math.floor(s)} sec ago` : s < 3600 ? `${Math.floor(s / 60)} min ago` : s < 86400 ? `${Math.floor(s / 3600)} hr ago` : `${Math.floor(s / 86400)} days ago`; })()}</span> </h1> */}



                                <h1>
                                    {item.userId.fullName}{" "}
                                    <span className="text-gray-500">
                                        {(() => {
                                            const created = new Date(item.createdAt);
                                            const updated = new Date(item.updatedAt);

                                            const isUpdated = updated.getTime() > created.getTime();

                                            const date = isUpdated ? updated : created;
                                            const s = (Date.now() - date.getTime()) / 1000;

                                            const time =
                                                s < 60
                                                    ? `${Math.floor(s)} sec ago`
                                                    : s < 3600
                                                        ? `${Math.floor(s / 60)} min ago`
                                                        : s < 86400
                                                            ? `${Math.floor(s / 3600)} hr ago`
                                                            : `${Math.floor(s / 86400)} days ago`;

                                            return isUpdated ? `Edited ${time}` : time;
                                        })()}
                                    </span>
                                </h1>


                            </div>
                            <div className="flex justify-between px-12">
                                {
                                    editingCommentId === item._id ? (
                                        <div className="flex flex-col gap-2">
                                            <Textarea
                                                value={editingContent}
                                                onChange={(e) => setEditingContent(e.target.value)}
                                                className='lg:w-200 w-[80vw] border-2 border-gray-400 max-h-20 overflow-auto'
                                            />
                                            <div className="flex gap-2">
                                                <Button onClick={() => editCommentHandler(item._id)}>Save</Button>
                                                <Button variant="outline" onClick={() => setEditingCommentId(null)}>Cancel</Button>
                                            </div>
                                        </div>
                                    ) : <h1>{item.content}</h1>


                                }

                                {
                                    user._id === item.userId._id ? <DropdownMenu>
                                        <DropdownMenuTrigger render={<Button variant="none"><EllipsisVertical size={50} className="inline-block" /></Button>} />
                                        <DropdownMenuContent className="w-40" align="center">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem onClick={() => { setEditingCommentId(item._id); setEditingContent(item.content) }} >
                                                    <FaEdit />Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => { deleteComment(item._id) }}
                                                    className="text-red-600"><Trash2 />Delete</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu> : null
                                }
                            </div>
                            <div className="flex gap-2 items-center px-12 mt-1 cursor-pointer">

                                <Button onClick={() => likeCommentHandler(item._id)} variant="none">
                                    {
                                        item.likes.includes(user._id) ? <FcLike /> : <FaRegHeart />
                                    }
                                    <span className="text-gray-900">{item.numberOfLikes}</span></Button>
                                <p>Reply</p>
                            </div>
                        </div>
                    })
                }
            </Card>
        </div>
    )
}

export default CommentBox
