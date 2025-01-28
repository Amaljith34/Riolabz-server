import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    description:{
        type:String,
        required:true
    },
    
    price:{
        type:Number,
        required:true
    },
    imageSrc:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        required: true,
    },
    isDelete:{
        type:Boolean,
        default:false
    },
    isShow:{
        type:Boolean,
        default:false
    }
    
})

const Product=mongoose.model('Products',productSchema)
export default Product