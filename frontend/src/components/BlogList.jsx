import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"


const BlogList = ({ blog }) => {
  const navigate = useNavigate()
  return (
    
    // <div className=" flex gap-3 p-2 mt-5 shadow-xl rounded-lg">
    //   <div>
    //     <img src={blog.thumbnail} alt="" className="rounded-lg object-cover aspect-video transition duration-300 hover:scale-105 hover:shadow-lg w-100" />
    //   </div>
    //   <div >
    //     <h1 className="text-2xl line-clamp-2">{blog.title}</h1>
    //     <p className="text-sm line-clamp-2 text-gray-700">{blog.subtitle}</p>
    //     <Button className='mt-2'>Read More</Button>
    //   </div>
    //   </div>
    
    <div className="flex gap-3 p-3 mt-5 shadow-xl rounded-2xl relative bg-linear-to-br from-white/80 via-purple-50/80 to-blue-50/80 backdrop-blur-xl border border-white/90 max-w-2xl overflow-hidden">
  
  {/* ✅ Shimmer Effect */}
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
  
  <div className="absolute inset-0 bg-linear-to-br from-purple-200/30 via-pink-200/20 to-blue-200/30 backdrop-blur-xl rounded-2xl pointer-events-none"></div>

  <div className="relative z-10 flex gap-3 w-full">
    {/* Thumbnail */}
    <div className="shrink-0 w-40">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="rounded-lg object-cover aspect-video transition duration-300 hover:scale-105 hover:shadow-lg w-full h-full"
      />
    </div>

    {/* Content */}
    <div className="flex-1 flex flex-col justify-between py-1">
      <div>
        <h1 className="text-xl font-bold text-gray-800 line-clamp-2">
          {blog.title}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {blog.subtitle || blog.description}
        </p>
      </div>

      <Button
        onClick={() => navigate(`/blog/${blog._id}`)}
        className="mt-2 px-4 py-1.5 bg-black/20 backdrop-blur-xl border border-white/30 rounded-full text-gray-900 cursor-pointer text-sm font-medium hover:bg-black/30 hover:border-white/50 transition-all duration-300 shadow-md w-fit"
      >
        Read More →
      </Button>
    </div>
  </div>
</div>
  )
}

export default BlogList
