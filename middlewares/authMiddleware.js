import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import AppError from './AppError.js';


dotenv.config();

export const checkAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Access denied. No token provided.", 401);
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.TOKEN_SECRET;

    if (!secret) {
      throw new AppError("Token secret is not defined in the environment variables.", 401);
    }

    const decodedToken = jwt.verify(token, secret);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ success: false, message: "Invalid token or unauthorized access." });
  }
};


