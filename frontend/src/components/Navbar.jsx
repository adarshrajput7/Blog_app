
import { Search, } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import axios from "axios"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/redux/authSlice"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ImExit } from "react-icons/im"
import { CiUser } from "react-icons/ci"
import { FaRegCommentAlt } from "react-icons/fa"
import { LuNotebookPen } from "react-icons/lu"
import { SlNotebook } from "react-icons/sl"



const Navbar = () => {

    const { user } = useSelector(store => store.auth)
    // console.log('store dataaaaaaa', user)
    const dispatch = useDispatch()
    // const usershow = false
    const navigate = useNavigate()
    const logoutHndel = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            })
            if (res.data.success) {
                navigate('/')
                dispatch(setUser(false))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log('frontend register ', error);
            toast.error(error.response.data.message)
        }
    }


    return (
        <div className="flex justify-between pl-10 pr-10 bg-gray-900 text-gray-300 items-center py-2.5">

            <div>
                <img className="w-10 h-10 rounded-2xl"
                    src="https://i.pinimg.com/control1/1200x/7c/4c/8b/7c4c8b2fce7e6ee9b78d99f295f2f711.jpg" alt="" />
            </div>

            <div>
                <Input
                    placeholder="text"
                    type="text"
                />
                <Button className='absolute bg-gray-300 ml-1 text-gray-900 hover:bg-gray-400'><Search /></Button>
            </div>

            <div className="flex gap-15 font-bold list-none">
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/blogs'}><li>Blogs</li></Link>
                <Link to={'/about'}><li>About</li></Link>


            </div>

            {
                user ? <div className="flex gap-2">

                    {/* <Button onClick={logoutHndel} className='bg-red-600 hover:bg-red-700'>Logout</Button> */}

                    <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="none"><Avatar>
                            <AvatarImage
                                src={user.photoUrl}
                                alt="@shadcn"

                            />
                            {/* <AvatarFallback>CN</AvatarFallback> */}
                            <AvatarFallback className="text-2xl font-bold flex items-center justify-center">
                                {user?.fullName?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar></Button>} />
                        <DropdownMenuContent className="w-40" align="start">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigate('/dashboard/profile')} ><CiUser /> Profile</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/dashboard/your-blog')}><SlNotebook />Your Blog</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/dashboard/comments')}><FaRegCommentAlt />Comments</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate('/dashboard/write-blog')}><LuNotebookPen />Write Blogs</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuItem onClick={logoutHndel} className='text-red-600'>
                                    <ImExit /> Log out
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>


                </div> : <div className="flex gap-3 mr-10">
                    <Link to={'/login'}><button className="bg-gray-300 text-gray-900 px-3 py-1 hover:bg-gray-400  rounded-xl">Login</button></Link>
                    <Link to={'/signup'}><button className="bg-gray-300 text-gray-900 px-3 py-1 hover:bg-gray-400  rounded-xl">Signup</button></Link>
                </div>
            }



        </div>
    )
}

export default Navbar

