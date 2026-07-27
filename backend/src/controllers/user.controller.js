import UserModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            })
        }

        const isEmailExists = await UserModel.findOne({ email })

        if (isEmailExists) {
            return res.status(409).json({
                success: false,
                message: "Email Already Exists"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)


        const user = await UserModel.create({
            fullName,
            email,
            password: hashPassword
        })

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            message: "Account Created successfully"
        })


    } catch (error) {
        console.log('register error ladle', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            })
        }

        const user = await UserModel.findOne({ email })
        
        if (!user) {
            return res.status(409).json({
                success: false,
                message: "Email Dos'nt Exists"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(409).json({
                success: false,
                message: "Invalid Password"
            })
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            success: true,
            message: `Welcome Back ${user.fullName}`
        })


    } catch (error) {
        console.log('login error ladle',error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }


}

export const logout = async (req, res) => {
    try {
        
        res.cookie('token', "", { maxAge: 0 })
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })


    } catch (error) {
        console.log('logout error ladle',error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}