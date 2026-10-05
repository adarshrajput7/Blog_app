
import { useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import axios from "../api/axios"
import toast from "react-hot-toast"
import { Navigate, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/redux/blogSlice"
import { setBlog } from "@/redux/blogSlice"
import { Loader} from "lucide-react"


const CreateBlog = () => {

  const [title, setTitle] = useState()
  const [categoryInput, setCategory] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { blog, loading } = useSelector(store => store.blog)
  const { user } = useSelector(store => store.auth)
  console.log(blog);
  console.log(typeof blog);
  console.log(Array.isArray(blog));


  const categoryValue = (value) => {
    setCategory(value)
  }
  const blogCreateHandler = async (e) => {
    e.preventDefault()
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`/api/v1/blog`, { title, category: categoryInput }, {
        headers: {
          'Content-Type': 'application/json'
        }, withCredentials: true
      })

      if (res.data.success) {
        const newBlog = [...blog, res.data.blog]
        console.log(res.data.blog._id);

        dispatch(setBlog(newBlog))
        navigate(`/dashboard/write-blog/${res.data.blog._id}`)
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log('create blog frontend', error)
      toast.error(error.response?.data?.message || 'Something went wrong')
    } finally { dispatch(setLoading(false)) }


  }

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />
  }


  return (
    <div className='flex justify-center items-center p-4  h-screen w-full pt-20 lg:pt-10'>
      <Card className='md:p-10 p-4 bg-gray-100 h-full w-full'>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-4xl">
          Let’s Create Something Worth Reading
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base lg:text-lg">
          Turn your thoughts into stories, share what inspires you, and build a blog
          that gives your ideas a place to be heard.
        </p>

        <div className='mt-10'>
          <div>
            <Label>Title</Label>
            <Input type='text' placeholder='Your blog name' className='bg-white text-black my-2'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Label className='mb-2'>Category</Label>
            <Select onValueChange={categoryValue}>
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder='Select a category' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel> Category</SelectLabel>
                  <SelectItem value='web devloper'>Web Devloper</SelectItem>

                  <SelectItem value='Digital Marketing'>Digital Marketing</SelectItem>

                  <SelectItem value='Blogging'>Blogging</SelectItem>

                  <SelectItem value='Photography'>Photography</SelectItem>

                  <SelectItem value='Cricket'>Cricket</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Button onClick={blogCreateHandler}>{
            loading ? <><Loader className="w-4 h-4 animate-spin" /></> : 'Create'
          }</Button>
        </div>
      </Card>

    </div>
  )
}

export default CreateBlog
