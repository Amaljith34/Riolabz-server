import { signUpValidation } from "../../middlewares/joiValidation.js"
import User from "../../models/userSchema/user.js"
import { comparePassword, hashedPassword } from "../../utils/bcrypt.js"
import { generateToken } from "../../utils/jwt.js"

export const registration=async(req,res)=>{
        const {username,email,password}=req.body
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({success:false,message:"Email already exists..."})
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
        return res.status(401).json({ success: false, message: "Invalid user" });
    }
    const validUser = await comparePassword(password, user.password); 

    if (!validUser) {
        return res.status(400).json({ success: false, message: "Incorrect password" });
    }
    if (user.isBlocked) { 
        return res.status(403).json({ success: false, message: "Sorry, you are blocked" });
    }
    if(user.status=='pending'){
        return res.status(402).json({success:false,message:"Registration request is pending"})
    }
    const token = generateToken(user.id);
    if (user.role === "admin") {
        return res.status(200).json({ success: true, message: "Admin login successfully",data:user ,token});
    }
    res.status(200).json({ success: true, message: "User login successfully", data:user ,token });
}

