import mongoose from "mongoose";
import User from "../../models/userSchema/user.js";


export const ApproveRejectUser = async (req, res) => {
        const userId = req.params.id;
        const {action} = req.body; 
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new AppError('Invalid User ID',400)
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new AppError('User does not exist',404)
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
            throw new AppError(`Invalid action. Use 'approve' or 'reject'`,400)
        }
};

export const toggluserBlock=async(req,res)=>{
        const userId=req.params.id;
        const user=await User.findById(userId );
            if(!user){
                throw new AppError('User not found',404)
            }
            const newState=!user.isBlocked;
            await User.findByIdAndUpdate(userId,{isBlocked:newState})
            const message=newState ? "User block successfully":"User unblock successfully"
            return res.status(200).json({success:true,message,useremail:user.email})
}
