import { setBlog } from '@/redux/blogSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './BlogList'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const RecentBlog = () => {
  const dispatch = useDispatch()
  const { blog } = useSelector(store => store.blog)
  const navigate = useNavigate()


  useEffect(() => {
    const getAllPublishedBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/blog/get-publishhed-blogs`, { withCredentials: true })
        console.log('allor', res.data.blogs);

        if (res.data.success) {
          dispatch(setBlog(res.data.blogs))
        }
      } catch (error) {
        console.log(error);

      }
    }

    getAllPublishedBlog()

  }, [])


  return (
    <>
      <div className="flex flex-col items-center py-6">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Recent Blogs</h1>
                <hr className="w-20 h-1 mt-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>
      <div className=' flex gap-4 mb-5 px-40'>
        <div className='w-300 '>
          {
            blog?.slice(0, 4)?.map((blog, index) => {
              return <BlogList blog={blog} key={index} />
            })
          }
        </div>
        <Card className='px-3 py-1 backdrop-blur-md border border-white/20 rounded-sm text-blue text-sm font-medium'>
          {/* <Card className='bg-green-10 flex flex-col items-center w-110 mx-3 rounded-sm py-3'> */}
          <h1 className='text-3xl mb-5'>Populor Catogory</h1>
          <div className='flex flex-wrap gap-2 px-3'>

            <Badge className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-sm text-blue text-sm font-medium">
              Cricket
            </Badge>
            <Badge className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-sm text-blue text-sm font-medium">
              Bloging
            </Badge>
            <Badge className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-sm text-blue text-sm font-medium">
              Bollywood
            </Badge>
            <Badge className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-sm text-blue text-sm font-medium">
              Sports
            </Badge>
            <Badge className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-sm text-blue text-sm font-medium">
              Digital Marketing
            </Badge>
            <Badge className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-sm text-blue text-sm font-medium">
              Photograpy
            </Badge>


          </div>
          <div className='mt-10 px-2 '>
            <h1 className='text-2xl font-semibold'>Subscribe to Newletter</h1>
            <p className='text-gray-800 mt-2'>Get the latest post and updates delivered straight to your inbox</p>
            <div className='flex gap-2 mt-5'>
              <Input placeholder='Enter Your Mail Id' className='px-3  py-1 bg-linear-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-black/20 rounded-sm text-blue text-sm font-medium' />
              <Button
                onClick={() => { toast.success('Subscribed') }}
                className=" bg-purple-500/20 backdrop-blur-xl border border-purple-300/30  text-black text-sm font-medium hover:bg-purple-500/30 transition "
              >
                Subscribe
              </Button>
            </div>
            <div className='flex items-center flex-col mt-10'>
              <h1 className='text-3xl'>Suggestion Blogs</h1>
              {
                blog?.slice(0, 6)?.map((blog, index) => {
                  return <p onClick={() => navigate(`/blog/${blog._id}`)} key={index} className="px-3 mt-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-sm text-blue text-md font-medium cursor-pointer hover:text-blue-700">
                    { index+1}. {blog.title}
                  </p>
                })
              }
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default RecentBlog
