import axios from "axios"
import { useEffect, useState } from "react"
import { Card } from "./ui/card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Navigate, useNavigate } from "react-router-dom"
import { ExternalLink, Loader2 } from "lucide-react"
import { useSelector } from "react-redux"
import { Avatar, AvatarImage } from "./ui/avatar"



const Comments = () => {

  const { user, loading } = useSelector(store => store.auth)
  const [getComment, setGetComment] = useState()
  console.log(getComment)
  const navigate = useNavigate()

  useEffect(() => {
    const getMyOwnAllCommentsOnMyBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/comment/get-all-comments`, { withCredentials: true })
        if (res.data.success) {
          console.log('All Comment my own blog', res.data);
          setGetComment(res.data.comments)
        }
      } catch (error) {
        console.error("🚀 ~ getMyOwnAllCommentsHandler ~ error:", error)
      }
    }
    getMyOwnAllCommentsOnMyBlog()
  }, [])

  // auth check - Redirect to login if not login
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" size={40} />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    )
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <>

      <div className="md:w-[calc(100vw-300px)] md:mt-0 mt-10 p-5 pb-5 lg:block hidden">
        <Card className="w-full bg-gray-100 md:p-10 p-4">
          <Table>
            <TableCaption>A list of your recent Comments.</TableCaption>
            <TableHeader>
              <TableRow className='w-full font-bold'>
                <TableHead className="w-[50%]">Title</TableHead>
                <TableHead className="w-[30%]">Comments <span className="bg-red-500 text-white rounded-full h-5 px-1.5 animate-pulse">{getComment?.length || 0}
                </span></TableHead>
                <TableHead className="w-[10%]">Author</TableHead>
                <TableHead className="text-center w-[10%]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getComment?.map((comment,index) => (
                  <TableRow key={index}>

                    <TableCell className=" font-medium flex items-center gap-3 truncate max-w-[50ch]" title={comment.postId.title}>
                      {/* <img src={comment.postId.thumbnail} alt="" className="w-20  object-cover aspect-video"/> */}
                      {comment.postId.title}
                    </TableCell>

                    <TableCell className="w-[25%] text-left ">
                      {comment.content}
                    </TableCell>

                    <TableCell className="w-[20%] whitespace-nowrap flex items-center gap-2">
                      {/* <Avatar>
                      <AvatarImage src={comment.userId.photoUrl} />
                    </Avatar> */}
                      {comment.userId.fullName}
                    </TableCell>

                    <TableCell className="w-[5%] text-center" >
                      <ExternalLink className="inline-block cursor-pointer text-lg" onClick={() => navigate(`/blog/${comment.postId._id}`)} />
                    </TableCell>
                  </TableRow>

              ))}
            </TableBody>
          </Table>


        </Card>

      </div>

      <div className="py-2 mt-15 px-1 bg-gray-200 lg:hidden">
        {
          getComment?.map((comment,index) => (

            <div onClick={() => navigate(`/blog/${comment.postId._id}`)} key={index} className="flex gap-2 items-center  px-1 my-2 rounded-sm shadow-sm">

              <Avatar className="shrink-0">
                <AvatarImage
                  src={comment.userId.photoUrl}
                />
              </Avatar>


              <div className="flex-1 min-w-0">

                <h1 className="truncate font-semibold text-[clamp(0.8em,1vw,1em)]">
                  {comment.userId.fullName} <span className="text-gray-700 text-[clamp(0.9em,1vw,1em)]">Comments on your blog</span>
                </h1>

                <div className="flex gap-3">

                  {/* 2 lines */}
                  <p className="w-1/2 line-clamp-1 text-[clamp(0.8em,1vw,1em)]">{comment.postId.title}</p>

                  {/* 2 lines */}
                  <p className="w-1/2 line-clamp-1 text-[clamp(0.8em,1vw,1em)] text-blue-600">{comment.content}</p>

                </div>
              </div>

              <img
                src={comment.postId.thumbnail}
                alt=""
                className="w-16 h-16 rounded-lg object-cover p-1"
              />

            </div>

          ))
        }
      </div>



    </>


  )
}

export default Comments
