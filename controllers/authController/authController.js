import AppError from "../../middlewares/AppError.js"
import { signUpValidation } from "../../middlewares/joiValidation.js"
import User from "../../models/userSchema/user.js"
import { comparePassword, hashedPassword } from "../../utils/bcrypt.js"
import { generateToken } from "../../utils/jwt.js"

export const registration=async(req,res)=>{
        const {username,email,password}=req.body
        const existingUser=await User.findOne({email})
        if(existingUser){
            throw new AppError('Email already exists...',400)
        }
        const validatedUser=await signUpValidation.validateAsync({username,email,password})
        const hashPassword=await hashedPassword(password)
        const newUser=new User({
            email:validatedUser.email,
            username:validatedUser.username,
            password:hashPassword
        })
        await newUser.save()
        res.status(200).json({success:true,message: "User registered successfully!",data: newUser})
}


export const Login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError('Invalid user',401)
    }
    const validUser = await comparePassword(password, user.password); 
    if (!validUser) {
        throw new AppError('Incorrect password ',400)
    }
    if (user.isBlocked) { 
        throw new AppError('Sorry, you are blocked',403)
    }
    if(user.status=='pending'){
        throw new AppError('Registration request is pending',402)
    }
    const token = generateToken(user.id);
    if (user.role === "admin") {
        return res.status(200).json({ success: true, message: "Admin login successfully",data:user ,token});
    }
    res.status(200).json({ success: true, message: "User login successfully", data:user ,token });
}

