import { useDispatch, useSelector } from "react-redux"
import BlogCard from "./BlogCard"
import { useEffect } from "react"
import axios from "axios"
import { setBlog } from "@/redux/blogSlice"


const Blogs = () => {

  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)
  console.log(blog);
  

  useEffect(() => {
    const getAllPublishedBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/blog/get-publishhed-blogs`, { withCredentials: true })
        console.log('allor',res.data.blogs);
        
        if (res.data.success) {
          dispatch(setBlog(res.data.blogs))
        }
      } catch (error) {
        console.log(error);
        
      }
    }

    getAllPublishedBlog()

  },[])

  return (
    <>
      <div className="flex flex-col items-center py-6">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Blogs</h1>
                <hr className="w-20 h-1 mt-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-10 overflow-y-auto items-center h-full justify-center ">
      
      {
        blog?.map((blog, index) => {
          return <BlogCard blog={blog} key={index} />
        })
      }
      {/* <BlogCard /> */}
      </div>
      </>
  )
}

export default Blogs
