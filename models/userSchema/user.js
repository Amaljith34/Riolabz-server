import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:['pending','approved','reject'],
        default:'pending'
    }
})
const User=mongoose.model('User',userSchema)
export default User