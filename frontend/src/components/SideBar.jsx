import { NavLink } from "react-router-dom"


const SideBar = () => {
    return (
        <div className='border-r-2  border-gray-900 w-72  h-screen'>
            <div className="flex flex-col h-screen gap-10 mt-25 items-center">
                <NavLink to={'/dashboard/profile'} className={({ isActive }) => `text-2xl text-center ${isActive ? 'bg-gray-900  text-gray-300' : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer px-15 py-2 rounded-xl `}>Profile</NavLink>
                
                <NavLink to={'/dashboard/your-blog'} className={({ isActive }) => `text-2xl text-center ${isActive ? 'bg-gray-900  text-gray-300' : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer px-15 py-2 rounded-xl `}>Your Blog</NavLink>

                <NavLink to={'/dashboard/comments'} className={({ isActive }) => `text-2xl text-center ${isActive ? 'bg-gray-900  text-gray-300' : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer px-15 py-2 rounded-xl `}>Comments</NavLink>

                <NavLink to={'/dashboard/write-blog'} className={({ isActive }) => `text-2xl text-center ${isActive ? 'bg-gray-900  text-gray-300' : "bg-transparent"} flex items-center gap-2 font-bold cursor-pointer px-15 py-2 rounded-xl `}>Create Blog</NavLink>
            </div>
        </div>
    )
}

export default SideBar
