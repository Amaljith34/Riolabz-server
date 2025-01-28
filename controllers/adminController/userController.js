import mongoose from "mongoose";
import User from "../../models/userSchema/user.js";


export const ApproveRejectUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const {action} = req.body; 
        
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }
        if (action === 'approve') {
            user.status = 'approved';
            await user.save();
            return res.status(200).json({ success: true, message: "User approved successfully",data:user });
        } else if (action === 'reject') {
            user.status = 'reject';
            await user.save();
            return res.status(200).json({ success: true, message: "User rejected successfully",data:user });
        } else {
            return res.status(400).json({ success: false, message: "Invalid action. Use 'approve' or 'reject'" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

export const toggluserBlock=async(req,res)=>{
    try {
        const userId=req.params.id;
        const user=await User.findById(userId );
            if(!user){
                res.status(400).json({success:false,message:"User not found"})
            }
            const newState=!user.isBlocked;

            await User.findByIdAndUpdate(userId,{isBlocked:newState})
            const message=newState ? "User block successfully":"User unblock successfully"
            return res.status(200).json({success:true,message,useremail:user.email})
    } catch (error) {
        res.status(500).send({ success: false, message: `Internal Server Error: ${error.message}` });
    }
}
