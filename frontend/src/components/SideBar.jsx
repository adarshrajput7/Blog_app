import { useSelector } from "react-redux"
import { Navigate, NavLink } from "react-router-dom"


const SideBar = () => {

    const { user} = useSelector(store => store.auth)

    // If user is not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return (
        // <div className="lg:static absolute lg:mb-0 mb-10 border-gray-900 w-full lg:w-72 shrink-0 h-fit lg:h-screen overflow-hidden ">
        //     <div className="flex flex-row lg:flex-col h-auto lg:h-screen gap-0 lg:gap-10 mt-5 lg:mt-25 items-center justify-center lg:justify-start overflow-hidden ">

        <div className="absolute lg:fixed lg:left-0 lg:top-0 lg:z-50 lg:w-72 w-full shrink-0 h-fit lg:h-screen overflow-hidden border-gray-900 mb-10 lg:mb-0">
    <div className="flex flex-row lg:flex-col h-auto lg:h-screen gap-0 lg:gap-10 mt-5 lg:mt-25 items-center justify-center lg:justify-start overflow-hidden">

                <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                        `text-sm sm:text-lg lg:text-2xl text-center ${isActive ? "bg-gray-900 text-gray-300" : "bg-transparent"
                        } flex items-center gap-2 font-bold cursor-pointer px-3 sm:px-5 lg:px-15 py-2 rounded-sm whitespace-nowrap`
                    }
                >
                    Profile
                </NavLink>

                <NavLink
                    to="/dashboard/your-blog"
                    className={({ isActive }) =>
                        `text-sm sm:text-lg lg:text-2xl text-center ${isActive ? "bg-gray-900 text-gray-300" : "bg-transparent"
                        } flex items-center gap-2 font-bold cursor-pointer px-3 sm:px-5 lg:px-15 py-2 rounded-sm whitespace-nowrap`
                    }
                >
                    Your Blog
                </NavLink>

                <NavLink
                    to="/dashboard/comments"
                    className={({ isActive }) =>
                        `text-sm sm:text-lg lg:text-2xl text-center ${isActive ? "bg-gray-900 text-gray-300" : "bg-transparent"
                        } flex items-center gap-2 font-bold cursor-pointer px-3 sm:px-5 lg:px-15 py-2 rounded-sm whitespace-nowrap`
                    }
                >
                    Comments
                </NavLink>

                <NavLink
                    to="/dashboard/write-blog"
                    className={({ isActive }) =>
                        `text-sm sm:text-lg lg:text-2xl text-center ${isActive ? "bg-gray-900 text-gray-300" : "bg-transparent"
                        } flex items-center gap-2 font-bold cursor-pointer px-3 sm:px-5 lg:px-15 py-2 rounded-sm whitespace-nowrap`
                    }
                >
                    Create Blog
                </NavLink>

            </div>
        </div>
    )
}

export default SideBar
