import User from "../models/userSchema/user.js";

export const adminMiddleware = async (req, res, next) => {
    try {
      const user = await User.findById(req.user); 
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, Admins only' });
      }
      next(); 
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };