// import { useDispatch, useSelector } from "react-redux"
// import BlogCard from "./BlogCard"
// import { useEffect } from "react"
// import axios from "axios"
// import { setBlog } from "@/redux/blogSlice"


// const Blogs = () => {

//   const dispatch = useDispatch()
//   const { blog } = useSelector(store => store.blog)
//   console.log(blog);


//   useEffect(() => {
//     const getAllPublishedBlog = async () => {
//       try {
//         const res = await axios.get(`https://blog-app-sjs3.onrender.com//api/v1/blog/get-publishhed-blogs`, { withCredentials: true })
//         console.log('allor', res.data.blogs);

//         if (res.data.success) {
//           dispatch(setBlog(res.data.blogs))
//         }
//       } catch (error) {
//         console.log(error);

//       }
//     }

//     getAllPublishedBlog()

//   }, [])

//   return (
//     <>
//       <div className="flex flex-col items-center py-2 md:py-6">
//         <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">Blogs</h1>
//         <hr className="w-15 md:w-20 h-1 mt-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-full" />
//       </div>

//       <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-5 md:px-4 lg:px-10 overflow-y-auto items-center justify-center h-full mb-6">

//         {
//           blog?.map((blog, index) => {
//             return <BlogCard blog={blog} key={index} />
//           })
//         }
//         {/* <BlogCard /> */}
//       </div>
//     </>
//   )
// }

// export default Blogs





import { useDispatch, useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { setBlog } from "@/redux/blogSlice";
import { Loader2 } from "lucide-react";

const Blogs = () => {
  const dispatch = useDispatch();
  const { blog } = useSelector((store) => store.blog);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const getAllPublishedBlog = async (pageNumber) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://blog-app-sjs3.onrender.com//api/v1/blog/get-publishhed-blogs?page=${pageNumber}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        // First page par blogs set honge
        if (pageNumber === 1) {
          dispatch(setBlog(res.data.blogs));
        } else {
          // Load More par naye blogs purane blogs ke saath add honge
          dispatch(setBlog([...blog, ...res.data.blogs]));
        }

        setHasMore(res.data.hasMore);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // First 15 blogs
  useEffect(() => {
    getAllPublishedBlog(1);
  }, []);

  const handleLoadMore = async () => {
    const currentScrollPosition = window.scrollY;

    const nextPage = page + 1;

    await getAllPublishedBlog(nextPage);

    setPage(nextPage);

    // Scroll position restore
    setTimeout(() => {
      window.scrollTo({
        top: currentScrollPosition,
        behavior: "instant",
      });
    }, 0);
  };


  return (
    <>
      <div className="flex flex-col items-center py-2 md:py-6">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Blogs
        </h1>

        <hr className="w-15 md:w-20 h-1 mt-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-full" />
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-5 md:px-4 lg:px-10 items-center justify-center mb-6">
        {blog?.map((item, index) => {
          return <BlogCard blog={item} key={item._id || index} />;
        })}
      </div> */}


      <div className="grid grid-cols-1 gap-2 px-2 pb-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 xl:gap-7">
        {blog?.map((item) => (
          <BlogCard
            key={item._id}
            blog={item}
          />
        ))}
      </div>


      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pb-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin"/> : "Load More"}
          </button>
        </div>
      )}

      {!hasMore && blog?.length > 0 && (
        <p className="text-center text-gray-500 pb-8">
          No more blogs
        </p>
      )}
    </>
  );
};

export default Blogs;
