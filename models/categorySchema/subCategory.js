import mongoose, { Types } from "mongoose";

const subCategorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})
const SubCategory=mongoose.model('SubCategory',subCategorySchema)
export default SubCategory