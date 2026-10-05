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
import { Ellipsis, EllipsisVertical, Loader2, SquarePen, Trash2 } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { MdDateRange } from "react-icons/md"



const YourBlog = () => {

  const { blog } = useSelector(store => store.blog)
  const { user, loading } = useSelector(store => store.auth)
  console.log(blog)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getOwnBlogs = async () => {
    try {
      const res = await axios.get(`https://blog-app-sjs3.onrender.com//api/v1/blog/get-own-blogs`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs))
      }
    } catch (error) {
      console.log('get own blog frontend', error)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`https://blog-app-sjs3.onrender.com//api/v1/blog/delete/${id}`, { withCredentials: true })
      if (res.data.success) {
        const updatedBlogData = blog.filter((blogItem) => blogItem?._id !== id)
        dispatch(setBlog(updatedBlogData))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log('delete blog frontend', error)
    }
  }

  useEffect(() => {
    getOwnBlogs()
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
      <div className="h-screen md:w-[calc(100vw-300px)]  flex overflow-y-auto md:mt-0 mt-10 md:pb-50 hidden md:block">
        <div className='p-4  h-screen w-screen md:w-full'>
          <Card className='md:p-10  p-4 w-full bg-gray-100 '>
            <Table className='md:block'>
              <TableCaption>A list of your recent Blogs.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-center w-2.1/4'>Title</TableHead>
                  <TableHead className=' w-0.8/4'>Category</TableHead>
                  <TableHead className=' w-0.8/4'>Date</TableHead>
                  <TableHead className='text-center w-0.8/4'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blog.map((item, index) => (
                  <TableRow key={index} className="">
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
                      <h1 onClick={() => navigate(`/blog/${item._id}`)} className="w-150 overflow-hidden font-bold hover:underline hover:text-blue-600  cursor-pointer">{item.title}</h1>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </TableCell>
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


      <div className="grid md:grid-cols-2 md:block lg:hidden mb-100 p-3 mt-15">

        {blog.map((item, index) => (
          <div key={index} className="shadow-lg py-2 px-2 mb-3">

            <DropdownMenu>
              <DropdownMenuTrigger render={<button onClick={(e)=>e.stopPropagation()} variant="none" className=" absolute right-2 mt-1 mr-4 z-10 w-10 h-6 rounded-sm flex items-center justify-center  text-white  bg-black/25 backdrop-blur-xl border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.35)]  active:scale-95 transition-all"><Ellipsis className="w-5 h-5 drop-shadow-md" /></button>} />
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate(`/dashboard/write-blog/${item._id}`)}><SquarePen />Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deleteBlog(item._id)}
                    className='text-red-600'><Trash2 />Delete</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div onClick={() => navigate(`/blog/${item._id}`)}>
              <img src={item.thumbnail || "https://i.pinimg.com/1200x/b6/15/c7/b615c782113259698e122eb25d862cfe.jpg"} className="w-screen object-cover aspect-video" alt="" />
            <h1  className="line-clamp-2 text-md font-semibold">{item.title}</h1>
            <div className="flex justify-between px-2">
              <p>{item.category}</p>
              <p className="flex justify-center items-center gap-2"><MdDateRange /> <span> {new Date(item.createdAt).toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}</span></p>
            </div>
            </div>
          </div>
        ))

        }

      </div>
    </>


  )

}

export default YourBlog
