import mongoose, { Types } from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    isDelete:{
        type:Boolean,
        default:false
    },
    subcategories: [{
         type: mongoose.Schema.Types.ObjectId, 
         ref: "SubCategory" 
        }], 
    
})

const Category=mongoose.model('Category',categorySchema)
export default Category