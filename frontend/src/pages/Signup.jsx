import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setLoading, setUser } from "@/redux/authSlice"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Signup = () => {
    const navigate = useNavigate()
    const { loading } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [input, setInput] = useState({  // Changed from { } to [ ]
        fullName: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`http://localhost:8000/api/v1/user/register`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data))
                navigate('/')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log('frontend register ', error);
            toast.error(error.response.data.message)
        } finally { dispatch(setLoading(false)) }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="w-full max-w-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-shadow duration-300">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to create account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name='fullName'  // Changed from 'name' to 'fullName'
                                    value={input.fullName}
                                    type="text"
                                    placeholder="Enter Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name='email'
                                    value={input.email}
                                    type="email"
                                    placeholder="m@example.com"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    name='password'
                                    value={input.password}
                                    type="password"
                                    placeholder='Create Password'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-6">
                            {
                                loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait...
                                    </>
                                ) : (
                                    "Signup"
                                )
                            }
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button
                        variant="outline"
                        className="w-full border-black hover:bg-black hover:text-white transition-colors"
                        onClick={() => navigate('/login')}
                    >
                        I already have an account
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Signup