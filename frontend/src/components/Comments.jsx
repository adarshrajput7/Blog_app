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
import { useNavigate } from "react-router-dom"
import { ExternalLink } from "lucide-react"



const Comments = () => {

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

  return (
    <div className="w-[calc(100vw-300px)] flex overflow-y-auto pb-50 p-5">
      <Card className='md:p-10 p-4 w-full bg-gray-100'>

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
                          {getComment?.map((comment, index) => (
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
                    <ExternalLink  className="inline-block cursor-pointer text-lg" onClick={()=>navigate(`/blog/${comment.postId._id}`)}/>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>


      </Card>
    </div>
  )
}

export default Comments
