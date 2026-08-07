import { useDispatch, useSelector } from "react-redux"
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
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { setBlog } from "@/redux/blogSlice"
import { useEffect } from "react"
import { EllipsisVertical, SquarePen, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"



const YourBlog = () => {

  const { blog } = useSelector(store => store.blog)
  console.log(blog)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getOwnBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/blog/get-own-blogs`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs))
      }
    } catch (error) {
      console.log('get own blog frontend', error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/blog/delete/${id}`, { withCredentials: true })
      if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id)
        dispatch(setBlog(updatedBlogData))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log('delete blog frontend', error)
    }
  }

  //   const timeAgo = (date) => {
  //   const now = new Date()
  //   const diff = Math.floor((now - new Date(date)) / 1000) // seconds

  //   if (diff < 60) return `${diff} seconds ago`
  //   if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`
  //   if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`
  //   if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`
  //   if (diff < 2592000) return `${Math.floor(diff / 604800)} weeks ago`
  //   if (diff < 31536000) return `${Math.floor(diff / 2592000)} months ago`
  //   return `${Math.floor(diff / 31536000)} years ago`
  // }

  useEffect(() => {
    getOwnBlogs()
  }, [])

  return (
    <div className="h-screen w-[calc(100vw-300px)] flex overflow-y-auto pb-50">
      <div className='p-4  h-screen w-full'>
        <Card className='md:p-10 p-4 w-full bg-gray-100'>

          <Table>
            <TableCaption>A list of your recent Blogs.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='text-center'>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blog.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium flex items-center">
                    <img
                      className="w-20 rounded-md hidden md:block mr-5 aspect-video object-cover border border-black"
                      src={item.thumbnail || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Crect x='32' y='30' width='36' height='24' rx='2' fill='%23d1d5db' stroke='%239ca3af' stroke-width='1.5'/%3E%3Cpolygon points='45,38 55,38 50,46' fill='%236b7280'/%3E%3Ccircle cx='50' cy='42' r='5' fill='%239ca3af'/%3E%3Ctext x='50' y='72' font-family='Arial' font-size='8' fill='%236b7280' text-anchor='middle' font-weight='bold'%3ENO THUMBNAIL%3C/text%3E%3C/svg%3E"}
                      alt="No Thumbnail"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Crect x='32' y='30' width='36' height='24' rx='2' fill='%23d1d5db' stroke='%239ca3af' stroke-width='1.5'/%3E%3Cpolygon points='45,38 55,38 50,46' fill='%236b7280'/%3E%3Ccircle cx='50' cy='42' r='5' fill='%239ca3af'/%3E%3Ctext x='50' y='72' font-family='Arial' font-size='8' fill='%236b7280' text-anchor='middle' font-weight='bold'%3ENO THUMBNAIL%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <h1 className="font-bold hover:underline cursor-pointer">{item.title}</h1>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </TableCell>
                  {/* <TableCell>
                    {timeAgo(item.createdAt)}
                  </TableCell> */}
                  <TableCell className="text-center">
                    {/* <div className="flex justify-center items-center">
                    <EllipsisVertical className="cursor-pointer" />
                  </div> */}
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="none"><EllipsisVertical size={30} className="cursor-pointer" /></Button>} />
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => navigate(`/dashboard/write-blog/${item._id}`)}><SquarePen />Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteBlog(item._id)}
                            className='text-red-600'><Trash2 />Delete</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>


        </Card>
      </div>
    </div>


  )
}

export default YourBlog
