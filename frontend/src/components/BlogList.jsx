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

    // <div onClick={() => navigate(`/blog/${blog._id}`)} className="lg:p-3 p-1 flex lg:gap-3 gap-1 lg:mt-5 mt-2 shadow-xl rounded-2xl relative bg-linear-to-br from-white/80 via-purple-50/80 to-blue-50/80 backdrop-blur-xl border border-white/90 max-w-2xl overflow-hidden">

    //   {/* ✅ Shimmer Effect */}
    //   <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent"></div>

    //   <div className="absolute inset-0 bg-linear-to-br from-purple-200/30 via-pink-200/20 to-blue-200/30 backdrop-blur-xl rounded-2xl pointer-events-none"></div>

    //   <div className="relative z-10 flex gap-3 w-full">
    //     {/* Thumbnail */}
    //     <div className="shrink-0 lg:w-40 w-30">
    //       <img
    //         src={blog.thumbnail}
    //         alt={blog.title}
    //         className="rounded-lg object-cover aspect-video transition duration-300 hover:scale-105 hover:shadow-lg w-full h-full"
    //       />
    //     </div>

    //     {/* Content */}
    //     <div className="flex-1 flex flex-col justify-between py-1">
    //       <div>
    //         <h1 className="lg:text-xl text-sm font-bold text-gray-800 line-clamp-2">
    //           {blog.title}
    //         </h1>
    //         <p className="lg:text-sm text-xs text-gray-600 line-clamp-2 mt-1">
    //           {blog.subtitle || blog.description}
    //         </p>
    //       </div>

    //       <Button
    //         onClick={() => navigate(`/blog/${blog._id}`)}
    //         className="hidden lg:block mt-2 px-4 py-1 bg-black/20 backdrop-blur-xl border border-white/30 rounded-full text-gray-900 cursor-pointer text-sm font-medium hover:bg-black/30 hover:border-white/50 transition-all duration-300 shadow-md w-fit">
    //         Read More →
    //       </Button>
    //     </div>
    //   </div>
    // </div>


    <div
  onClick={() => navigate(`/blog/${blog._id}`)}
  className="group flex w-full max-w-2xl cursor-pointer gap-3 rounded-2xl border border-gray-300 bg-white p-1 shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)] sm:gap-4 "
>
  {/* Image */}
  <div className="h-20 w-28 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-36 md:h-28 md:w-44">
    <img
      src={blog.thumbnail}
      alt={blog.title}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  </div>

  {/* Content */}
  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
    <div>
      <h2 className="line-clamp-2 text-sm font-semibold leading-5 tracking-tight text-gray-900 sm:text-base sm:leading-6 md:text-lg">
        {blog.title}
      </h2>

      <p className="mt-1 line-clamp-2 text-xs leading-4 text-gray-500 sm:text-sm sm:leading-5">
        {blog.subtitle || blog.description}
      </p>
    </div>

    {/* Button */}
    <Button
      onClick={(e) => {
        e.stopPropagation()
        navigate(`/blog/${blog._id}`)
      }}
      className="mt-2 hidden h-8 w-fit rounded-full border border-gray-200 bg-gray-900 px-3.5 text-xs font-medium text-white shadow-sm transition-all duration-300 hover:bg-gray-800 hover:shadow-md lg:flex"
    >
      Read More
      <span className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5">
        →
      </span>
    </Button>
  </div>
</div>

  )
}

export default BlogList
