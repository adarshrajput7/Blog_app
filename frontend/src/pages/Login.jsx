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

const Login = () => {
    const navigate = useNavigate()
    const { loading } = useSelector(store => store.auth)
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const [input, setInput] = useState({
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
            const res = await axios.post(`/api/v1/user/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }, withCredentials: true
            })
            if (res.data.success) {
                navigate('/')
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log('frontend login ', error);
            toast.error(error.response.data.message)
        } finally { dispatch(setLoading(false)) }
    }

    return (

          <div className="min-h-[70vh] w-full flex items-center justify-center px-4 py-8 sm:px-6">
    <Card className="w-full max-w-md border-0 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-2xl">
      <CardHeader className="space-y-2 px-6 pt-7 sm:px-8 sm:pt-8">
        <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome back
        </CardTitle>

        <CardDescription className="text-sm sm:text-base text-muted-foreground">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 sm:px-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-medium">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="m@example.com"
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
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                required
                className="h-11 rounded-lg pr-11 focus-visible:ring-2"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-muted-foreground hover:text-foreground
                           transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg text-sm sm:text-base font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="px-6 pb-7 sm:px-8 sm:pb-8">
        <Button
          type="button"
          variant="outline"
          className="h-11 w-full rounded-lg border-2 font-medium hover:bg-muted"
          onClick={() => navigate("/signup")}
        >
          Create New Account
        </Button>
      </CardFooter>
    </Card>
  </div>
    )
}

export default Login
