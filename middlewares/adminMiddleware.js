import jwt from 'jsonwebtoken'
import User from '../models/userSchema/user.js';
import AppError from './AppError.js';

const JWT_SECRET = process.env.TOKEN_SECRET || "your_jwt_secret";

export const checkAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authorization token is required.", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const { _id: id } = decoded;

    if (!id) {
      throw new AppError("Invalid token. Admin ID not found.", 401);
    }

    const admin = await User.findById(id);

    if (!admin || admin.role !== "admin") {
      throw new AppError("Access denied. Admin privileges required.", 403);
    }

    next();
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


