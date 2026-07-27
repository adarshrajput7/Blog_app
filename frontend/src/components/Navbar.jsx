
import { Search, } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import axios from "axios"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/redux/authSlice"


const Navbar = () => {

    const { user } = useSelector(store => store.auth)
    console.log('store dataaaaaaa',user)
    const dispatch = useDispatch()
    // const usershow = false
    const navigate = useNavigate()
    const logoutHndel = async (e) => {
         e.preventDefault()
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
                headers: {
                    'Content-Type':'application/json'
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
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                        className="grayscale"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button onClick={logoutHndel} className='bg-red-600 hover:bg-red-700'>Logout</Button>
            </div> :  <div className="flex gap-3 mr-10">
                <Link to={'/login'}><button className="bg-gray-300 text-gray-900 px-3 py-1 hover:bg-gray-400  rounded-xl">Login</button></Link>
                <Link to={'/signup'}><button className="bg-gray-300 text-gray-900 px-3 py-1 hover:bg-gray-400  rounded-xl">Signup</button></Link>
            </div>
            }

            

        </div>
    )
}

export default Navbar

