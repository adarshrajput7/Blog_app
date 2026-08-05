import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Card } from "./ui/card"
import { AiOutlineFacebook, AiOutlineLinkedin } from "react-icons/ai"
import { FaEdit, FaInstagram } from "react-icons/fa"
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
// import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { setLoading, setUser } from "@/redux/authSlice"
import { Loader2 } from "lucide-react"


const Profile = () => {

    const { user, loading } = useSelector(store => store.auth)
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
            const res = await axios.put(`http://localhost:8000/api/v1/user/profile/update`, formData, {
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


    return (
        <div className="m-10 flex items-center text-gray-900">
            <Card className='' >
                <div className='h-full w-220  flex gap-5 justify-around'>
                    {/* image section  */}
                    <div className="flex flex-col items-center gap-10 p-5">
                        <div>
                            <Avatar className='h-30 w-30 object-cover border-2 border-gray-900'>
                                <AvatarImage src={user?.photoUrl} alt="Morty Avatar" />
                                <AvatarFallback className="text-2xl font-bold flex items-center justify-center">
                                    {user?.fullName?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <h1 className="text-2xl">{user.occupation}</h1>
                        <div className="flex gap-3">
                            <Link to={user.facebook} className=""><AiOutlineFacebook size={40} /></Link>
                            <Link to={user.instagram} className=""><FaInstagram size={40} /></Link>
                            <Link to={user.github} className=""><FiGithub size={40} /></Link>
                            <Link to={user.linkedin} className=""><AiOutlineLinkedin size={40} /></Link>
                        </div>
                    </div>
                    {/* details section  */}
                    <div className="flex flex-col gap-5 justify-center p-5">
                        <h1 className="text-2xl">Welcome {user.fullName}</h1>
                        <h1>Email: <span>{user.email}</span></h1>
                        <div>
                            <Label>About</Label>
                            <p className="border-2  rounded-2xl p-3 mt-3 mb-5">{user.bio}</p>
                            {/* <Button>Edit Profile</Button> */}
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
                                            <Label htmlFor="occupation" className="text-sm font-medium">Occupation</Label>
                                            <Input id="occupation" name="occupation" defaultValue={user?.occupation || ''} />
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
                                        <Label htmlFor="bio" className="text-sm font-medium flex items-center gap-1.5"> Bio
                                        </Label>
                                        <Textarea id="bio" placeholder="Type your Bio here." name='bio' className='max-h-20'
                                            value={input.bio}
                                            onChange={eventChangeHandler} />
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

                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Profile


