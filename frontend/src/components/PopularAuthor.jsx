
import axios from "axios";
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTrigger } from "./ui/alert-dialog";
import { Eye, X } from "lucide-react";
import { Button } from "./ui/button";
import { FaFacebookSquare, FaGithubSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdVerified } from "react-icons/md";

const PopularAuthor = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
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
                      <div className="flex gap-3 text-gray-400">
                        <Link className="transition hover:scale-110 hover:text-white">
                          <FaInstagram size={22} />
                        </Link>

                        <Link className="transition hover:scale-110 hover:text-white">
                          <FaFacebookSquare size={22} />
                        </Link>

                        <Link className="transition hover:scale-110 hover:text-white">
                          <FaGithubSquare size={22} />
                        </Link>

                        <Link className="transition hover:scale-110 hover:text-white">
                          <FaLinkedin size={22} />
                        </Link>
                      </div>

                      <AlertDialogCancel className="p-0">
                        <button
                          onClick={() => toast.warning("This Features is under process")}
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
