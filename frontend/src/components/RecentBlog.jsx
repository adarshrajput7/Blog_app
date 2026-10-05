import { setBlog } from "@/redux/blogSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "./BlogList";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const categories = [
  "Cricket",
  "Blogging",
  "Bollywood",
  "Sports",
  "Digital Marketing",
  "Photography",
];

const RecentBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blog } = useSelector((store) => store.blog);


  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")

  const handleSubscribe = () => {
    const value = email.trim()

    if (!value) {
      setEmailError("Email is required")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address")
      return
    }

    setEmailError("")
    toast.success("Subscribed successfully!")
    setEmail("")
  }


  // useEffect(() => {
  //   const getBlogs = async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:8000/api/v1/blog/get-publishhed-blogs",
  //         { withCredentials: true }
  //       );

  //       if (res.data.success) {
  //         dispatch(setBlog(res.data.blogs));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getBlogs();
  // },[], [dispatch]);


  useEffect(() => {
  const getBlogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/blog/get-publishhed-blogs",
        {
          withCredentials: true,
        }
      );

      console.log("BLOG API RESPONSE:", res.data);

      if (res.data.success) {
        dispatch(setBlog(res.data.blogs));
      }
    } catch (error) {
      console.log("BLOG API ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("ERROR DATA:", error.response?.data);
    }
  };

  getBlogs();
}, [dispatch]);


  return (
    <section className="w-full px-2 py-8 sm:px-6 lg:px-10 xl:px-16">
      {/* Heading */}
      <div className="mb-7 text-center sm:mb-10">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-purple-500">
          Latest Articles
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          Recent Blogs
        </h2>

        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-linear-to-r from-purple-500 to-pink-500" />
      </div>

      {/* Main Layout */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] lg:gap-8 xl:grid-cols-[1fr_370px]">

        {/* Recent Blogs */}
        <div className="min-w-0 space-y-4">
          {blog?.slice(0, 5)?.map((item) => (
            <BlogList
              key={item._id}
              blog={item}
            />
          ))}
        </div>

        {/* Sidebar */}
        <aside className="h-fit space-y-5 lg:sticky lg:top-5">

          {/* Categories */}
          <div className="rounded-2xl border border-white/60 bg-white/40 p-5 shadow-sm backdrop-blur-xl sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Popular Categories
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  className="cursor-pointer rounded-full border border-gray-300/70 bg-white/60 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-gray-400 hover:bg-white/90 hover:text-gray-950 hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)] sm:text-sm"
                >
                  {category}
                </Badge>

              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="rounded-2xl border border-purple-100 bg-linear-to-br from-purple-50/80 via-white/70 to-pink-50/80 p-5 shadow-sm sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Subscribe to Newsletter
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Get the latest posts and updates delivered straight to your inbox.
            </p>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <div className="min-w-0 flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError("")
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubscribe()
                  }}
                  className={`h-10 w-full rounded-lg bg-white/70 text-sm ${emailError ? "border-red-500 focus-visible:ring-red-500" : "border-gray-200"
                    }`}
                />

                {emailError && (
                  <p className="mt-1 text-xs text-red-500">
                    {emailError}
                  </p>
                )}
              </div>

              <Button
                type="button"
                onClick={handleSubscribe}
                className="h-10 rounded-lg"
              >
                Subscribe
              </Button>
            </div>
          </div>


          {/* Suggestions */}
          <div className="rounded-2xl border border-white/60 bg-white/40 p-5 shadow-sm backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">
                Suggested Blogs
              </h3>

              <span className="text-xs text-gray-400">
                {Math.min(blog?.length || 0, 6)} posts
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {blog?.slice(0, 6)?.map((item, index) => (
                <button
                  key={item._id}
                  onClick={() => navigate(`/blog/${item._id}`)}
                  className="group flex w-full items-start gap-3 rounded-xl p-2.5 text-left transition hover:bg-white/70"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="line-clamp-2 text-sm font-medium leading-5 text-gray-700 transition group-hover:text-purple-600">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default RecentBlog;
