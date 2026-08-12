
import { useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/redux/blogSlice"
import { setBlog } from "@/redux/blogSlice"
import { Loader } from "lucide-react"


const CreateBlog = () => {

  const [title, setTitle] = useState()
  const [categoryInput, setCategory] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { blog, loading } = useSelector(store => store.blog)
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
      const res = await axios.post(`http://localhost:8000/api/v1/blog`, { title, category: categoryInput }, {
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


  return (
    <div className='p-4  h-screen  pt-20'>
      <Card className='md:p-10 p-4 bg-gray-100'>
        <h1>Lets Create a Blog</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus ex esse quia atque iste impedit vel, nemo aperiam omnis mollitia rerum et earum eos repellat architecto. At ullam ex excepturi.</p>

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
