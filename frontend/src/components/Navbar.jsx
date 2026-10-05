import { Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ImExit } from "react-icons/im";
import { CiUser } from "react-icons/ci";
import { FaReact, FaRegCommentAlt, FaRegUser, } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { SlNotebook } from "react-icons/sl";
import { useEffect, useState } from "react";

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const { blog = [] } = useSelector((store) => store.blog || {});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchContent, setSearchContent] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);
    const [showNav, setShowNav] = useState(true);

    const changeSearchHandler = (e) => {
        const value = e.target.value;
        setSearchContent(value);
        if (!value.trim()) return setFilteredData([]);
        const search = value.toLowerCase();
        setFilteredData(
            blog.filter(
                (item) =>
                    item?.title?.toLowerCase().includes(search) ||
                    item?.subtitle?.toLowerCase().includes(search) ||
                    item?.category?.toLowerCase().includes(search),
            ),
        );
    };

    const searchHandler = (e) => {
        e.preventDefault();
        if (!searchContent.trim()) return;
        navigate(`/search?q=${encodeURIComponent(searchContent.trim())}`);
        setSearchContent("");
        setFilteredData([]);
        setSearchOpen(false);
    };

    const clearSearch = () => {
        setSearchContent("");
        setFilteredData([]);
    };

    const logoutHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("/api/v1/user/logout", {
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/");
                dispatch(setUser(false));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout failed");
        }
    };


    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 80) {
                setShowNav(false);
            } else if (currentScrollY < lastScrollY) {
                setShowNav(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <>
            <header className="mb-15">
                {/* <nav className="relative flex bg-pink-400 py-8 md:py-3 justify-around items-center flex-col gap-4 md:flex-row md:justify-around md:gap-0 z-550"> */}

                <nav
                    className={`fixed top-0 left-0 z-550 flex w-full flex-col items-center justify-around gap-4 border-b border-white/20 bg-[linear-gradient(110deg,rgba(6,78,59,0.62),rgba(13,148,136,0.38),rgba(15,118,110,0.48),rgba(4,47,46,0.62))] py-8  shadow-[0_8px_40px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.3),inset_0_-8px_30px_rgba(45,212,191,0.12)] backdrop-blur-[28px] backdrop-saturate-180 transition-all duration-500 ease-out md:flex-row md:gap-0 md:py-3 ${showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>

                    {/* LOGO section */}
                    <div className="md:static flex items-center absolute left-0 ml-5 gap-2">
                        <FaReact className="animate-spin" size={22} />
                        <Link to={'/'} className="lg:text-2xl text-xl ">MindleBlog</Link>
                    </div>

                    {/* Search section */}
                    <div className={`${searchOpen ? "block mt-25 absolute" : "hidden"} md:block md:w-auto`}>
                        <form onSubmit={searchHandler} className="relative max-w-xs md:w-80 text-center">
                            {/* Aapka Original Input Box */}
                            <div className="relative flex w-full items-center">
                                <Input value={searchContent} onChange={changeSearchHandler} placeholder="Search blogs..." className="block w-xs rounded border border-gray-800 bg-gray-950 p-1.5 pr-16 text-white outline-none" />

                                <div className="absolute right-1 flex items-center">
                                    {searchContent && <Button type="button" variant="none" onClick={clearSearch} className="p-1 text-gray-400"><X size={16} /></Button>}
                                    <Button type="submit" variant="none" className="rounded p-1 text-white"><Search size={16} /></Button>
                                </div>
                            </div>

                            {/* Clean & Modern Search Suggestions Dropdown */}
                            {filteredData.length > 0 && (
                                <div
                                    onWheel={(e) => e.stopPropagation()}
                                    onTouchMove={(e) => e.stopPropagation()}
                                    style={{ WebkitOverflowScrolling: "touch" }}
                                    className="absolute left-0 top-full z-50  w-full max-h-[50vh]  overflow-y-auto overscroll-contain touch-pan-y rounded border border-sky-500/20 bg-black/80 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl ring-1 ring-white/10 text-left"
                                >
                                    {/* Header with Sky Glow */}
                                    <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                                                Instant Results
                                            </span>
                                        </div>
                                        <span className="rounded-md bg-sky-500/10 px-2 py-0.5 font-mono text-[10px] text-sky-300 border border-sky-500/20">
                                            {filteredData.length} matches
                                        </span>
                                    </div>

                                    {/* Result Items */}
                                    <div className="space-y-1">
                                        {filteredData.map((item, index) => (
                                            <div
                                                key={item?._id || index}
                                                onClick={() => {
                                                    navigate(`/blog/${item._id}`);
                                                    clearSearch();
                                                    setSearchOpen(false);
                                                }}
                                                className="group flex items-center justify-between gap-3 rounded-xl p-2 cursor-pointer transition-all duration-150 hover:bg-white/4 border border-transparent hover:border-sky-500/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.05)]"
                                            >
                                                {/* Main Info */}
                                                <div className="min-w-0 flex-1 space-y-1">
                                                    <p className="line-clamp-1 text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                                                        {item.title}
                                                    </p>

                                                    {item.subtitle && (
                                                        <p className="line-clamp-1 text-xs text-white/60 font-normal">
                                                            {item.subtitle}
                                                        </p>
                                                    )}

                                                    {/* Micro Tags */}
                                                    <div className="pt-0.5 flex items-center gap-2 text-[10px] font-medium">
                                                        <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-sky-300 border border-sky-500/20">
                                                            #{item.category}
                                                        </span>
                                                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-white/70 border border-white/10">
                                                            {item?.author?.fullName || "Unknown"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Minimal Sky Chevron Arrow */}
                                                <span className="text-white">
                                                    →
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Navigate links */}
                    <div className={`${navOpen ? "flex translate-x-0 text-5xl" : "flex translate-x-full pointer-events-none"}cursor-pointer md:flex md:translate-x-0 flex-col md:flex-row fixed md:static top-16 right-0 w-full md:w-auto items-center gap-8 md:gap-15 p-8 md:p-0 rounded-b-sm md:rounded-none text-xl transition-transform duration-500 z-50 md:bg-transparent bg-white`}>

                        <Link to={'/'} onClick={() => { setNavOpen(false) }} className={`${navOpen ? "text-4xl text-gray-600" : "text-xl"} cursor-pointer relative font-semibold after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-black after:transition-all after:duration-300 hover:after:w-full`}>Home</Link>
                        <Link onClick={() => { navigate('/blogs'); setNavOpen(false) }} className={`${navOpen ? "text-4xl text-gray-600" : "text-xl"} relative font-semibold after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-black after:transition-all after:duration-300 hover:after:w-full`}>Blogs</Link>
                        <Link onClick={() => { navigate('/about'); setNavOpen(false) }} className={`${navOpen ? "text-4xl text-gray-600 mb-5" : "text-xl"} relative font-semibold after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-black after:transition-all after:duration-300 hover:after:w-full `}>About</Link>
                        <p className={`${navOpen ? "text-xs text-gray-600 absolute bottom-5" : "hidden"}`}>Made with <span className="text-red-500">♥</span> for curious minds.</p>
                    </div>

                    {/* <div className={`${navOpen ? "flex translate-x-0 h-fit" : "flex translate-x-full pointer-events-none"} md:flex md:translate-x-0 flex-col md:flex-row w-full fixed md:static top-16 right-0 md:w-auto items-center gap-8 md:gap-15 p-8 md:p-0 rounded-b-sm md:rounded-none transition-transform duration-500 z-50 bg-white md:bg-transparent`}>
                        <Link to="/" onClick={() => setNavOpen(false)} className={`relative font-semibold ${navOpen ? "text-4xl text-gray-600" : "text-xl"} md:text-xl after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-black after:transition-all after:duration-300 hover:after:w-full`}>Home</Link>
                        <Link to="/blogs" onClick={() => setNavOpen(false)} className={`relative font-semibold ${navOpen ? "text-4xl text-gray-600" : "text-xl"} md:text-xl after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-black after:transition-all after:duration-300 hover:after:w-full`}>Blog</Link>
                        <Link to="/about" onClick={() => setNavOpen(false)} className={`relative font-semibold ${navOpen ? "text-4xl text-gray-600 mb-5" : "text-xl"} md:text-xl after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-black after:transition-all after:duration-300 hover:after:w-full`}>About</Link>
                        <p className={`${navOpen ? "text-xs text-gray-600 absolute bottom-5" : "hidden"}`}>Made with <span className="text-red-500">♥</span> for curious minds.</p>
                    </div> */}






                    {/* Profile */}

                    <div className="flex shrink-0 items-center absolute md:static right-0">
                        <div className="flex gap-3 justify-center items-center">

                            {/* Search open close in phone */}
                            <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden">
                                {searchOpen ? <X /> : <Search size={22} />}
                            </button>

                            {user ? (
                                <DropdownMenu className="z-100">
                                    <DropdownMenuTrigger>
                                        {/* <Button variant="none" className="h-10 w-10 rounded-full p-0"> */}
                                        <Avatar className="">
                                            <AvatarImage src={user.photoUrl} alt={user.fullName} />
                                            <AvatarFallback>
                                                {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        {/* </Button> */}
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent
                                        side="bottom"
                                        sideOffset={8}
                                        align="end"
                                        className="z-99999 w-auto  bg-white/30 backdrop-blur-2xl border border-white/50 shadow-[inset_0_1px_3px_rgba(255,255,255,0.9),0_8px_30px_rgba(0,0,0,0.15)]"
                                    >
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onClick={() => navigate("/dashboard/profile")}
                                            >
                                                <CiUser /> Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => navigate("/dashboard/your-blog")}
                                            >
                                                <SlNotebook /> Your Blog
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => navigate("/dashboard/comments")}
                                            >
                                                <FaRegCommentAlt /> Comments
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => navigate("/dashboard/write-blog")}
                                            >
                                                <LuNotebookPen /> Write Blog
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={logoutHandler}
                                            className="text-red-600"
                                        >
                                            <ImExit /> Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link to="/login" className="flex h-10 w-10 items-center justify-center ">
                                    <FaRegUser size={17} className="md:size-6" />

                                </Link>
                            )}


                            {/* menu on/off button hamburgur */}
                            <Button variant="none"
                                onClick={() => setNavOpen(!navOpen)}
                                className="relative flex h-10 w-10 items-center justify-center md:hidden">
                                <span className={`absolute h-0.5 w-6 bg-black transition-all duration-300 ${navOpen ? "rotate-45" : "-translate-y-2"}`} />
                                <span className={`absolute h-0.5 w-4 right-2.5 bg-black transition-all duration-300 ${navOpen ? "opacity-0" : "opacity-100"}`} />
                                <span className={`absolute h-0.5 w-6 bg-black transition-all duration-300 ${navOpen ? "-rotate-45" : "translate-y-2"}`} />
                            </Button>

                        </div>
                    </div>

                </nav>
            </header>
        </>
    );
};

export default Navbar;
