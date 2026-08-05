import jwt from 'jsonwebtoken'

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token
        
        if (!token) {
            return res.status(401).json({
                message: 'Authentication failed',
                success: false
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if (!decoded || !decoded.id) {
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            })
        }

        req.id = decoded.id
        req.user = decoded 
        next()

    } catch (error) {
        console.log('isAuthenticated error:', error)
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Invalid token',
                success: false
            })
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token expired',
                success: false
            })
        }

        return res.status(500).json({
            message: 'Authentication Error',
            success: false
        })
    }
}