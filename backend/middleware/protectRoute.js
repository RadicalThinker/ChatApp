import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized-no token',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized-invalid token',
            });
        }

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized-user not found',
            });
        }

        req.user = user; // req.user is available in the next middleware
        next();
    } catch (error) {
        console.log('Error in protectRoute', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};