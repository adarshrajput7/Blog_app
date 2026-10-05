import { Link, Navigate } from "react-router-dom"
import { AiOutlineFacebook, AiOutlineLinkedin } from "react-icons/ai"
import { FaEdit, FaInstagram, FaUserEdit } from "react-icons/fa"
import { FiGithub, } from "react-icons/fi"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { setLoading, setUser } from "@/redux/authSlice"
import { Loader2, Plus } from "lucide-react"
import { Badge } from "./ui/badge"


const Profile = () => {

    const { user, loading } = useSelector(store => store.auth)
    console.log(user);
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        fullName: user?.fullName,
        occupation: user?.occupation,
        bio: user?.bio,
        facebook: user?.facebook,
        instagram: user?.instagram,
        github: user?.github,
        linkedin: user?.linkedin,
        file: user?.photoUrl
    })
    const [open, setOpen] = useState(false)


    const eventChangeHandler = (e) => {
        const { name, value } = e.target
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const changeFileHandle = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHndler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('fullName', input.fullName)
        formData.append('bio', input.bio)
        formData.append('instagram', input.instagram)
        formData.append('occupation', input.occupation)
        formData.append('facebook', input.facebook)
        formData.append('github', input.github)
        formData.append('linkedin', input.linkedin)
        if (input?.file) {
            formData.append('file', input?.file)
        }

        try {
            dispatch(setLoading(true))
            const res = await axios.put(`https://blog-app-sjs3.onrender.com/api/v1/user/profile/update`, formData, {
                headers: {
                    'Content-Type': "multipart/form-data"
                }, withCredentials: true
            })

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                setOpen(false)
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log('update profile error ladle', error);
        } finally { dispatch(setLoading(false)) }
    }


    // If user is not logged in, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <>
            <div className="min-h-90vh mt-20 md:mt-5 md:w-[calc(100vw-19rem)] w-screen overflow-x-hidden  flex items-center justify-center p-2 sm:p-5 z-50">

                <div className=" relative h-[70vh] min-h-145 w-[90vw] sm:w-[75vw] md:w-150 lg:w-190 xl:w-212 2xl:w-225 overflow-hidden rounded-[32px] sm:rounded-[42px]  shadow-xl">

                    {/* Background image */}
                    <img src={user.photoUrl || "https://i.pinimg.com/1200x/01/7c/44/017c44c97a38c1c4999681e28c39271d.jpg"} alt={user.fullName} className=" absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 lg:blur-[6px] lg:scale-[1.03]" />

                    {/* Desktop glass overlay */}
                    <div className="absolute inset-0hidden lg:block bg-black/10backdrop-blur-[2px]" />

                    {/* Edit button */}
                    <div onClick={() => setOpen(true)}
                        className=" absolute z-20 top-3 right-4 sm:top-4 sm:right-5 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full  bg-white/10 backdrop-blur-md border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_15px_rgba(0,0,0,0.35)] cursor-pointer transition-all duration-300  hover:bg-white/15  hover:border-white/40 hover:scale-110 active:scale-90">
                        <FaUserEdit size={24} className="text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]" />

                    </div>


                    <Dialog open={open} onOpenChange={setOpen}>

                        <DialogTrigger render={<Button onClick={() => setOpen(true)} ><FaEdit /> Edit Profile</Button>} />
                        <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you&apos;re
                                    done.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                                    <Input id="fullName" name="fullName" value={input.fullName}
                                        onChange={eventChangeHandler} />
                                </div>
                                <div>
                                    <div className="mb-1.5 flex items-center justify-between">
                                        <Label htmlFor="occupation" className="text-sm font-medium">Occupation</Label>
                                        <span className="text-xs text-gray-400">{input.occupation?.length || 0}/40</span>
                                    </div>
                                    <Input id="occupation" name="occupation" maxLength={40} value={input.occupation} onChange={eventChangeHandler} />
                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="instagram" className="text-sm font-medium flex items-center gap-1.5">
                                        <FaInstagram className="text-pink-600" /> Instagram
                                    </Label>
                                    <Input id="instagram" name="instagram" value={input.instagram}
                                        onChange={eventChangeHandler} />
                                </div>
                                <div>
                                    <Label htmlFor="github" className="text-sm font-medium flex items-center gap-1.5">
                                        <FiGithub /> Github
                                    </Label>
                                    <Input id="github" name="github"
                                        value={input.github}
                                        onChange={eventChangeHandler}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="facebook" className="text-sm font-medium flex items-center gap-1.5">
                                        <AiOutlineFacebook className="text-blue-700" /> Facebook
                                    </Label>
                                    <Input id="facebook" name="facebook"
                                        value={input.facebook}
                                        onChange={eventChangeHandler}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-1.5">
                                        <AiOutlineLinkedin className="text-blue-600" /> LinkedIn
                                    </Label>
                                    <Input id="linkedin" name="linkedin" value={input.linkedin}
                                        onChange={eventChangeHandler} />
                                </div>
                            </div>

                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <Label htmlFor="bio" className="flex items-center gap-1.5 text-sm font-medium">
                                        Bio
                                    </Label>
                                    <span className="text-xs text-gray-400">
                                        {input.bio?.length || 0}/120
                                    </span>
                                </div>

                                <Textarea id="bio" name="bio" placeholder="Type your Bio here." className="max-h-20"
                                    maxLength={120}
                                    value={input.bio}
                                    onChange={eventChangeHandler}
                                />
                            </div>


                            <div>
                                <Label htmlFor="photoUrl" className="text-sm font-medium flex items-center gap-1.5">Photo
                                </Label>
                                <Input id="photoUrl" name="photoUrl" type='file' className='max-w-50' onChange={changeFileHandle} />
                            </div>


                            <DialogFooter>
                                <DialogClose render={<Button variant="outline">Cancel</Button>} />
                                <Button onClick={submitHndler}>{loading ? <><Loader2 className="animate-spin" />Updating...</> : 'Save Profile'}</Button>
                            </DialogFooter>
                        </DialogContent>

                    </Dialog>


                    {/* Bottom gradient */}
                    <div className=" absolute inset-x-0 bottom-0 h-[52%] sm:h-[48%] bg-linear-to-t  from-[#657477]/95  via-[#8c9899]/65 to-transparent backdrop-blur-[1px]" />

                    {/* Content */}
                    <div className=" absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8 lg:p-10 xl:p-11  text-white">

                        {/* Small profile picture - laptop only */}
                        <div className="hidden lg:block mb-4">

                            <div className=" w-17 h-17 rounded-full overflow-hidden border-2 border-white/70  bg-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.6)]" >
                                <img src={user.photoUrl} alt={user.fullName} className="w-full h-full object-cover" />
                            </div>

                        </div>

                        {/* Name */}
                        <div className="flex items-center gap-2 mb-2">

                            <h1 className=" text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] leading-none font-medium tracking-[-1.2px] truncate" >{user.fullName}</h1>
                        </div>

                        {/* Email */}
                        <h1>{user.email}</h1>

                        {/* Bio */}
                        <Label className="font-semibold text-sm sm:text-base">Bio: </Label>

                        <p className=" text-sm sm:text-base md:text-lg lg:text-xl mt-1 leading-[1.45] font-light max-w-150  text-white/95 line-clamp-3">{user.bio}</p>

                        {/* Occupation */}
                        <Badge className=" relative z-50 mt-4 sm:mt-5 overflow-hidden rounded-full border border-white/35  bg-white/12 px-3 sm:px-4 py-1 sm:py-1.5 text-sm sm:text-base  text-white backdrop-blur-2xl backdrop-saturate-200 shadow-[0_8px_30px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] before:absolute before:inset-0 before:bg-linear-to-b  before:from-white/25 before:to-transparent before:pointer-events-none">
                            <span className="relative z-10"> {user.occupation}</span>
                        </Badge>

                        {/* Bottom row */}
                        <div className="  flex items-center justify-between gap-4 mt-4 sm:mt-5">

                            {/* Social icons */}
                            <div className="flex items-center gap-3 sm:gap-4">
                                <Link to={user.instagram} target="_blank" className="sm:w-6 sm:h-6"><FaInstagram size={21} /></Link>
                                <Link to={user.github} target="_blank" className="sm:w-6 sm:h-6"><FiGithub size={21} /></Link>
                                <Link to={user.linkedin} target="_blank" className="sm:w-6 sm:h-6"><AiOutlineLinkedin size={21} /></Link>
                                <Link to={user.facebook} target="_blank" className=" sm:h-6 sm:w-6"><AiOutlineFacebook size={21} /></Link>

                            </div>

                            {/* Follow */}
                            <button className=" shrink-0 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full  bg-white  text-black flex items-center gap-2 sm:gap-3 text-base sm:text-lg md:text-[21px] font-semibold shadow-[0_8px_25px_rgba(0,0,0,0.12)]  hover:bg-gray-100 active:scale-95 transition-all duration-200">Follow<Plus size={22} className="sm:w-7 sm:h-7" strokeWidth={2.5} />
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile


