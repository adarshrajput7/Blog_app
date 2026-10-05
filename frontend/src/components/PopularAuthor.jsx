
import axios from "../api/axios.js";
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTrigger } from "./ui/alert-dialog";
import { Eye, X } from "lucide-react";
import { Button } from "./ui/button";
import { FaFacebookSquare, FaGithubSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";

const PopularAuthor = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(
          "/api/v1/user/all-users"
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
    <section className="w-full px-4 py-8 sm:px-6 lg:px-10">
      {/* Heading */}
      <div className="mb-6 text-center sm:mb-8">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-purple-500">
          Meet the writers
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          Popular Authors
        </h2>

        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-linear-to-r from-purple-500 to-pink-500" />
      </div>

      {/* Authors */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:gap-6">
        {users?.slice(0, 4).map((author) => (
          <div
            key={author._id}
            onClick={() => console.log(author.fullName, author._id)}
            className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/40 p-4 text-center shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5"
          >

            <AlertDialog>
              <AlertDialogTrigger
                className="absolute top-0 right-0 text-gray-700 "
                render={<Button variant="none"><Eye /></Button>}
              />

              <AlertDialogContent className="w-[40vh] lg:w-[45vh] max-w-none overflow-hidden rounded-lg border border-white/10 bg-[#0b0f10] p-0 text-white shadow-2xl">
                <AlertDialogDescription>
                  <img
                    src={author.photoUrl}
                    alt=""
                    className="aspect-square"
                  />

                  <div className="space-y-2 p-3">
                    <div>
                      <p className="flex items-center gap-2 text-lg font-semibold text-white">
                        {author.fullName}
                        <MdVerified className="text-cyan-400" />
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <p className="rounded-full border border-[#02f2ea]/20 bg-[#02f2ea]/10 px-3 py-1 text-xs font-medium text-[#02f2ea]">
                        {author.occupation}
                      </p>

                      {/* <p className="rounded-full border border-[#02f2ea]/20 bg-[#02f2ea]/10 px-3 py-1 text-xs font-medium text-[#02f2ea]">
                        {author.email.replace(/^(.{2}).*(@.*)$/, "$1***$2")}
                      </p> */}
                    </div>

                    <p className="rounded-sm border border-white/10 bg-white/3 p-2 text-sm text-gray-400">
                      <span className="font-medium text-gray-200">Bio:</span>{" "}
                      {author.bio}
                    </p>

                    <div className="flex items-center justify-between pt-2">

                      <div className="flex items-center gap-1.5">
                        <div className="relative group">
                          <a href={author?.instagram || undefined} target={author?.instagram ? "_blank" : undefined} rel={author?.instagram ? "noopener noreferrer" : undefined} onClick={(e) => !author?.instagram && e.preventDefault()} className={`relative flex items-center justify-center p-1 rounded transition-all duration-200 ${author?.instagram ? "cursor-pointer text-pink-500 hover:text-pink-400 hover:scale-110 active:scale-95" : "cursor-not-allowed text-gray-500/40"}`}>
                            <FaInstagram size={20} />
                            {!author?.instagram && <span className="absolute w-5 h-0.5 bg-red-500/80 rotate-45 rounded-full pointer-events-none" />}
                          </a>
                          <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 z-50">{author?.instagram ? "Instagram" : "Not Linked"}</span></div>

                        <div className="relative group">
                          <a href={author?.facebook || undefined} target={author?.facebook ? "_blank" : undefined} rel={author?.facebook ? "noopener noreferrer" : undefined} onClick={(e) => !author?.facebook && e.preventDefault()} className={`relative flex items-center justify-center p-1 rounded transition-all duration-200 ${author?.facebook ? "cursor-pointer text-blue-500 hover:text-blue-400 hover:scale-110 active:scale-95" : "cursor-not-allowed text-gray-500/40"}`}>
                            <FaFacebookSquare size={20} />
                            {!author?.facebook && <span className="absolute w-5 h-0.5 bg-red-500/80 rotate-45 rounded-full pointer-events-none" />}</a><span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 z-50">{author?.facebook ? "Facebook" : "Not Linked"}
                          </span></div>

                        <div className="relative group">
                          <a href={author?.github || undefined} target={author?.github ? "_blank" : undefined} rel={author?.github ? "noopener noreferrer" : undefined} onClick={(e) => !author?.github && e.preventDefault()} className={`relative flex items-center justify-center p-1 rounded transition-all duration-200 ${author?.github ? "cursor-pointer text-white hover:text-gray-300 hover:scale-110 active:scale-95 drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]" : "cursor-not-allowed text-gray-500/40"}`}>
                          <FaGithubSquare size={20} />
                          {!author?.github && <span className="absolute w-5 h-0.5 bg-red-500/80 rotate-45 rounded-full pointer-events-none" />}</a><span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 z-50">{author?.github ? "GitHub" : "Not Linked"}
                          </span></div>

                        <div className="relative group"><a href={author?.linkedin || undefined} target={author?.linkedin ? "_blank" : undefined} rel={author?.linkedin ? "noopener noreferrer" : undefined} onClick={(e) => !author?.linkedin && e.preventDefault()} className={`relative flex items-center justify-center p-1 rounded transition-all duration-200 ${author?.linkedin ? "cursor-pointer text-sky-400 hover:text-sky-300 hover:scale-110 active:scale-95" : "cursor-not-allowed text-gray-500/40"}`}>
                          <FaLinkedin size={20} />
                          {!author?.linkedin && <span className="absolute w-5 h-0.5 bg-red-500/80 rotate-45 rounded-full pointer-events-none" />}
                        </a><span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/90 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 z-50">{author?.linkedin ? "LinkedIn" : "Not Linked"}</span></div>
                      </div>


                      <AlertDialogCancel className="p-0">
                        <button
                          onClick={() => toast.error("This Feature is under process")}
                          className="rounded-md bg-white px-4 py-1.5 text-sm font-medium text-black transition hover:bg-gray-200"
                        >
                          Follow
                        </button>
                      </AlertDialogCancel>
                    </div>

                  </div>
                </AlertDialogDescription>

                <AlertDialogCancel
                  variant="none"
                  className="absolute right-2 top-2 rounded-full border border-white/20 bg-black/50 p-2 text-white shadow-md backdrop-blur-md hover:bg-black/70"
                >
                  <X size={18} />
                </AlertDialogCancel>
              </AlertDialogContent>
            </AlertDialog>






            {/* Soft background */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-300/20 blur-2xl transition-all duration-300 group-hover:bg-purple-400/30" />

            <div className="relative">
              {/* Avatar */}
              <div className="mx-auto h-16 w-16 overflow-hidden rounded-full border-2 border-white bg-gray-100 shadow-md sm:h-20 sm:w-20 md:h-24 md:w-24">
                <img
                  src={
                    author.photoUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      author.fullName || "User"
                    )}&background=6366f1&color=fff`
                  }
                  alt={author.fullName || "Author"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Name */}
              <h3 className="mt-3 truncate text-sm font-semibold text-gray-800 sm:text-base md:text-lg">
                {author.fullName || "Unknown"}
              </h3>

              {/* Role */}
              <p className="mt-1 text-xs text-gray-500">
                {author.occupation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularAuthor;
