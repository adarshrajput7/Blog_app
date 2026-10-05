import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {


  const [users, setUsers] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  
  useEffect(() => {
      

    const getTotalBlogs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/blog/get-publishhed-blogs",
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTotalBlogs(res.data.totalBlogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getTotalBlogs();
      const getAllUsers = async () => {
        try {
          const res = await axios.get(
            "http://localhost:8000/api/v1/user/all-users"
          );
  
          if (res.data.success) {
            setUsers(res.data.users);
          }
        } catch (error) {
          console.log(error);
        }
      };
  
      getAllUsers();
    }, []);


  return (

    <section className="relative isolate flex min-h-[calc(100dvh-3.75rem)] w-full overflow-hidden bg-[#fafafa] text-gray-900">
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-purple-200/30 blur-[120px]" />
    <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-200/25 blur-[120px]" />
  </div>

  <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-5 sm:px-6 sm:py-6 md:px-8 lg:px-10 lg:py-8">
    <div className="flex flex-1 items-center py-4 sm:py-6 lg:py-8">
      <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[1fr_.85fr] md:gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-10 xl:grid-cols-[1.15fr_.85fr] xl:gap-14">

        {/* Left */}
        <div className="min-w-0">
          <h1 className="max-w-4xl text-[clamp(2.75rem,9vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.055em] sm:text-[clamp(3.5rem,8vw,5.5rem)] md:text-[clamp(3.2rem,6vw,5rem)] lg:text-[clamp(4.5rem,6.2vw,6.5rem)]">
            Stories
            <br />
            <span className="text-gray-400">worth your</span>
            <br />
            <span className="bg-linear-to-r from-purple-600 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">time.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-6 text-gray-500 sm:mt-6 sm:text-base sm:leading-7 lg:mt-8 lg:text-lg">
            Discover thoughtful stories, useful ideas and different perspectives from a growing community of writers.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-7 sm:gap-3 lg:mt-8">
            <Link to="/blogs" className="group flex h-11 items-center gap-2 rounded-full bg-gray-950 px-5 text-sm font-semibold text-white shadow-lg shadow-gray-900/10 transition hover:-translate-y-0.5 hover:bg-purple-600 sm:h-12 sm:px-6">
              Start Reading
              <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link to="/dashboard/write-blog" className="flex h-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-5 text-sm font-medium text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md sm:h-12 sm:px-6">
              <PenLine size={16} />
              Write a Story
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="relative mx-auto w-full max-w-[min(88vw,420px)] md:max-w-[min(42vw,400px)] lg:max-w-[min(38vw,440px)]">
          <div className="relative rounded-[1.5rem] border border-white bg-white p-1.5 shadow-[0_25px_70px_rgba(80,70,140,0.12)] sm:rounded-[1.75rem] sm:p-2 lg:rounded-[2rem]">
            <div className="relative aspect-square overflow-hidden rounded-[1.15rem] sm:rounded-[1.4rem] lg:rounded-[1.5rem]">
              <img src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=600&auto=format&fit=crop&q=60" alt="Creative writing workspace" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/20 bg-white/15 p-3 backdrop-blur-xl sm:bottom-4 sm:left-4 sm:right-4 sm:rounded-2xl sm:p-4">
                <div className="flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/60 sm:text-[10px]">Featured</p>
                    <p className="mt-1 line-clamp-2 text-[11px] font-medium leading-4 text-white sm:text-sm sm:leading-5">A collection of ideas from people who love to create.</p>
                  </div>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-gray-900 sm:h-10 sm:w-10">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-2 top-8 hidden rounded-full border border-white bg-white px-3 py-1.5 text-[10px] font-medium text-gray-600 shadow-lg lg:-left-7 lg:block">Fresh perspectives</div>
          <div className="absolute -right-2 bottom-8 hidden rounded-full border border-white bg-white px-3 py-1.5 text-[10px] font-medium text-gray-600 shadow-lg lg:-right-7 lg:block">Read • Learn • Share</div>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="w-full shrink-0 border-t pt-4 sm:pt-5 lg:max-w-2xl">
      <div className="grid grid-cols-3 ">
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">100+</p>
          <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs lg:text-sm">Readers</p>
        </div>

        <div className="border-l border-gray-200 pl-4 sm:pl-6 lg:pl-8 flex flex-col justify-center items-center">
          <p className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">{totalBlogs}</p>
          <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs lg:text-sm">Stories</p>
        </div>

        <div className="border-l border-gray-200 pl-4 sm:pl-6 lg:pl-8 flex flex-col justify-center items-center">
          <p className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">{users.length}</p>
          <p className="mt-0.5 text-[10px] text-gray-400 sm:text-xs lg:text-sm">Writers</p>
        </div>
      </div>
    </div>

    {/* Scroll Down */}
    <div className="flex shrink-0 justify-center pt-4 sm:pt-5">
      <button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 transition hover:text-gray-900 sm:text-xs"
      >
        <span>Scroll Down</span>
        <ArrowDown size={14} className="animate-bounce transition-transform group-hover:translate-y-1" />
      </button>
    </div>
  </div>
</section>

  );
};

export default Hero;
