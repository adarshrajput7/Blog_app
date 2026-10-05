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
import axios from "../api/axios.js"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Signup = () => {
    const navigate = useNavigate()
    const { loading } = useSelector(store => store.auth)
    const [showPassword, setShowPassword] = useState(false);
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
            const res = await axios.post(`/api/v1/user/register`, input, {
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
        // <div className="flex justify-center h-[80vh] items-center">
        //     <Card className="w-full max-w-sm  shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-shadow duration-300 mx-5">
        //         <CardHeader>
        //             <CardTitle>Create an account</CardTitle>
        //             <CardDescription>
        //                 Enter your details below to create account
        //             </CardDescription>
        //         </CardHeader>
        //         <CardContent>
        //             <form onSubmit={handleSubmit}>
        //                 <div className="flex flex-col gap-6">
        //                     <div className="grid gap-2">
        //                         <Label htmlFor="name">Name</Label>
        //                         <Input
        //                             id="name"
        //                             name='fullName'  // Changed from 'name' to 'fullName'
        //                             value={input.fullName}
        //                             type="text"
        //                             placeholder="Enter Name"
        //                             onChange={handleChange}
        //                             required
        //                         />
        //                     </div>
        //                     <div className="grid gap-2">
        //                         <Label htmlFor="email">Email</Label>
        //                         <Input
        //                             id="email"
        //                             name='email'
        //                             value={input.email}
        //                             type="email"
        //                             placeholder="m@example.com"
        //                             onChange={handleChange}
        //                             required
        //                         />
        //                     </div>
        //                     <div className="grid gap-2">
        //                         <div className="flex items-center">
        //                             <Label htmlFor="password">Password</Label>
        //                         </div>
        //                         <Input
        //                             id="password"
        //                             name='password'
        //                             value={input.password}
        //                             type="password"
        //                             placeholder='Create Password'
        //                             onChange={handleChange}
        //                             required
        //                         />
        //                     </div>
        //                 </div>
        //                 <Button type="submit" className="w-full mt-6">
        //                     {
        //                         loading ? (
        //                             <>
        //                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        //                                 Please wait...
        //                             </>
        //                         ) : (
        //                             "Signup"
        //                         )
        //                     }
        //                 </Button>
        //             </form>
        //         </CardContent>
        //         <CardFooter className="flex-col gap-2">
        //             <Button
        //                 variant="outline"
        //                 className="w-full border-black hover:bg-gray-200 transition-colors"
        //                 onClick={() => navigate('/login')}
        //             >
        //                 I already have an account
        //             </Button>
        //         </CardFooter>
        //     </Card>
        // </div>




         <div className="min-h-[80vh] w-full flex items-center justify-center px-4 py-8 sm:px-6">
    <Card className="w-full max-w-md rounded-2xl border-0 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_25px_70px_rgba(0,0,0,0.16)]">
      
      {/* Header */}
      <CardHeader className="space-y-2 px-6 pt-7 sm:px-8 sm:pt-8">
        <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
          Create an account
        </CardTitle>

        <CardDescription className="text-sm sm:text-base text-muted-foreground">
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>

      {/* Form */}
      <CardContent className="px-6 sm:px-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name" className="font-medium">
              Name
            </Label>

            <Input
              id="name"
              name="fullName"
              value={input.fullName}
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
              required
              className="h-11 rounded-lg px-3 focus-visible:ring-2"
            />
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-medium">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              value={input.email}
              type="email"
              placeholder="m@example.com"
              onChange={handleChange}
              required
              className="h-11 rounded-lg px-3 focus-visible:ring-2"
            />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password" className="font-medium">
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                value={input.password}
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                onChange={handleChange}
                required
                className="h-11 rounded-lg px-3 pr-11 focus-visible:ring-2"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-muted-foreground
                           hover:text-foreground
                           transition-colors
                           focus:outline-none"
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg font-semibold text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-6 pb-7 sm:px-8 sm:pb-8">
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full rounded-lg border-2 font-medium
                     hover:bg-muted transition-colors"
          onClick={() => navigate("/login")}
        >
          I already have an account
        </Button>
      </CardFooter>
    </Card>
  </div>
    )
}

export default Signup