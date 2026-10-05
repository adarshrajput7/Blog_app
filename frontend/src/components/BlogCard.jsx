import { useNavigate } from "react-router-dom"
import { Bookmark,  Heart } from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { updateSingleBlog } from "@/redux/blogSlice"
import { FcLike } from "react-icons/fc"
import { useState, useEffect } from "react"

const BlogCard = ({ blog }) => {
  console.log("amal", blog);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.auth)

  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [likesCount, setLikesCount] = useState(blog?.likes?.length || 0);

  useEffect(() => {
    if (blog && user) {
      setIsLikedByUser(blog.likes?.includes(user._id) || false);
    }
    setLikesCount(blog?.likes?.length || 0);
  }, [blog, user]);

  const likeHandle = async (e) => {
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to like blogs");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `https://blog-app-sjs3.onrender.com//api/v1/blog/${blog._id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        console.log(res.data.data.likesCount);

        // Update local state immediately for better UX
        setIsLikedByUser(prev => !prev);
        setLikesCount(prev => prev + (isLikedByUser ? -1 : 1));

        // Update Redux 
        dispatch(updateSingleBlog(res.data.blog));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log('Like/Unlike error:', error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (

    // <div onClick={() => navigate(`/blog/${blog._id}`)} className="group relative w-full md:max-w-xl cursor-pointer overflow-hidden rounded-sm border border-white/70 bg-white/18 p-1.5 backdrop-blur-[25px] backdrop-saturate-180 shadow-[0_20px_60px_rgba(80,100,160,0.12)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(80,100,160,0.18)]">
    //   {/* Liquid glass background */}
    //   <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-linear-to-br from-white/70 via-purple-100/20 to-cyan-200/30" />

    //   {/* Soft cyan/purple glow */}
    //   <div className="pointer-events-none absolute -right-20 -bottom-24 h-64 w-64 rounded-full bg-cyan-300/25 blur-3xl" />
    //   <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-purple-300/20 blur-3xl" />

    //   {/* Main content */}
    //   <div className="relative z-10 overflow-hidden rounded-sm">
    //     {/* Image */}
    //     <div className="relative overflow-hidden">
    //       <img src={blog.thumbnail} alt={blog.title} className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
    //       <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-white/10" />

    //       {/* Category */}
    //       <span className="absolute right-4 top-4 rounded-full border border-white/60 bg-white/20 px-4 py-2 text-xs font-medium text-gray-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] backdrop-blur-xl backdrop-saturate-150">
    //         {blog.category}
    //       </span>
    //     </div>

    //     {/* Content */}
    //     <div className="px-5 lg:pb-5 md:pb-3 pb-3 pt-5 lg:px-2">
    //       {/* Author + Date */}
    //       <div className="flex items-center justify-between gap-3">
    //         <div className="flex min-w-0 items-center gap-3">
    //           {/* Author Photo */}
    //           <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/80 bg-white/40 shadow-[0_4px_15px_rgba(0,0,0,0.08)]">
    //             {blog.author?.photoUrl ? (
    //               <img src={blog.author.photoUrl} alt={blog.author?.fullName || "Author"} className="h-full w-full object-cover" />
    //             ) : (
    //               <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-purple-200 to-cyan-200 text-sm font-semibold text-gray-600">
    //                 {blog.author?.fullName?.charAt(0) || "U"}
    //               </div>
    //             )}
    //           </div>

    //           <div className="min-w-0">
    //             <p className="truncate text-sm font-medium text-gray-800">{blog.author?.fullName || "Unknown"}</p>
    //             <p className="text-xs text-gray-500">
    //               {new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
    //             </p>
    //           </div>
    //         </div>

    //         {/* More */}
    //         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/30 text-gray-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] backdrop-blur-xl">
    //           <span className="text-lg leading-none">•••</span>
    //         </div>
    //       </div>

    //       {/* Title */}
    //       <h2 className="mt-5 line-clamp-2 text-lg md:text-2xl font-semibold leading-[1.2] tracking-[-0.5px] text-gray-900 transition-colors duration-300 group-hover:text-gray-700">
    //         {blog.title}
    //       </h2>

    //       {/* Subtitle */}
    //       <p className="mt-2 line-clamp-2 text-[14px] leading-6 text-gray-600">
    //         {blog.subtitle || blog.description}
    //       </p>

    //       {/* Actions */}
    //       <div className="lg:mt-5 md:mt-2 mt-2 flex items-center gap-1">
    //         {/* Read More */}
    //         <button
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             navigate(`/blog/${blog._id}`);
    //           }}
    //           className="relative w-1/2 h-10 flex items-center justify-center overflow-hidden rounded-full border border-white/70 text-sm font-medium text-gray-900 backdrop-blur-[20px] backdrop-saturate-180 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(255,255,255,0.2),0_6px_20px_rgba(80,180,200,0.08)] transition-all duration-300 hover:border-white/90 hover:bg-white/32 hover:shadow-[0_8px_25px_rgba(80,180,200,0.15)] active:scale-[0.98] bg-cyan-300/22 py-2"
    //         >
    //           <span className="pointer-events-none absolute inset-px rounded-full bg-linear-to-b from-white/45 via-white/10 to-transparent" />

    //           <span className="relative z-10 text-sm">
    //             Read More →
    //           </span>
    //         </button>

    //         {/* Like */}
    //         <button onClick={likeHandle} className="relative flex h-12 min-w-12 items-center justify-center gap-1.5 overflow-hidden rounded-full border border-white/60 bg-white/25 px-3 text-gray-700 backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
    //           {/* <span className="pointer-events-none absolute inset-px rounded-full bg-linear-to-b from-white/40 via-white/10 to-transparent" /> */}
    //           {/* <span className="relative z-10 flex items-center gap-1.5"> */}
    //             {isLikedByUser ? <FcLike size={20} /> : <Heart className="transition-all duration-300 hover:scale-105 hover:text-red-500 active:scale-95" size={19} />}
    //             <span className="text-sm font-medium">{likesCount}</span>
    //           {/* </span> */}
    //         </button>

    //         {/* Bookmark */}
    //         <button onClick={(e) => { e.stopPropagation(); toast.error('This feature not available') }} className="flex lg:h-12 lg:w-12 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/25 backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-300 hover:scale-105 hover:bg-white/40 active:scale-95">
    //           <Bookmark className="h-4.5 w-4.5 text-gray-500 transition-colors hover:text-yellow-500" />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>





    <div
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="group w-full cursor-pointer overflow-hidden rounded-xl border border-white/60 bg-white/30 p-1 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Glass background */}
      <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-white/70 via-purple-50/40 to-cyan-50/50">

        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

          {/* Category */}
          <span className="absolute right-3 top-3 rounded-full border border-white/50 bg-black/20 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-md sm:text-xs">
            {blog.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 lg:p-5">

          {/* Author */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">

              {/* Avatar */}
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/70 bg-white/50 sm:h-9 sm:w-9">
                {blog.author?.photoUrl ? (
                  <img
                    src={blog.author.photoUrl}
                    alt={blog.author?.fullName || "Author"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-purple-200 to-cyan-200 text-xs font-semibold text-gray-600 sm:text-sm">
                    {blog.author?.fullName?.charAt(0) || "U"}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-gray-800 sm:text-sm">
                  {blog.author?.fullName || "Unknown"}
                </p>

                <p className="text-[10px] text-gray-500 sm:text-xs">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* More */}
            {/* <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/30 text-sm text-gray-500 backdrop-blur-md sm:h-9 sm:w-9">
              <Ellipsis />
            </div> */}
          </div>

          {/* Title */}
          <h2 className="mt-3 line-clamp-2 text-base font-semibold leading-tight text-gray-900 sm:mt-4 sm:text-lg lg:text-xl">
            {blog.title}
          </h2>

          {/* Subtitle */}
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
            {blog.subtitle || blog.description}
          </p>

          {/* Actions */}
          <div className="mt-3 flex items-center gap-2 sm:mt-4">

            {/* Read More */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/blog/${blog._id}`);
              }}
              className="flex h-9 flex-1 items-center justify-center rounded-full border border-white/60 bg-cyan-300/20 text-xs font-medium text-gray-900 backdrop-blur-md transition hover:bg-cyan-300/30 active:scale-[0.98] sm:h-10 sm:text-sm"
            >
              Read More →
            </button>

            {/* Like */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                likeHandle(e);
              }}
              className="flex h-9 min-w-9 items-center justify-center gap-1 rounded-full border border-white/60 bg-white/30 px-2 text-gray-700 backdrop-blur-md transition hover:bg-white/50 active:scale-95 sm:h-10 sm:min-w-10"
            >
              {isLikedByUser ? (
                <FcLike size={18} />
              ) : (
                <Heart
                  size={17}
                  className="transition-colors hover:text-red-500"
                />
              )}

              <span className="text-xs font-medium sm:text-sm">
                {likesCount}
              </span>
            </button>


            {/* Bookmark */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toast.error("This feature not available");
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 bg-white/30 text-gray-500 backdrop-blur-md transition hover:bg-white/50 hover:text-yellow-500 active:scale-95 sm:h-10 sm:w-10"
            >
              <Bookmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>


  )
}

export default BlogCard