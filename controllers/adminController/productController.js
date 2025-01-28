
import mongoose from "mongoose";
import { productValidation, updateproductValidation } from "../../middlewares/joiValidation.js";
import Category from "../../models/categorySchema/category.js";
import Product from "../../models/productSchema/product.js";

export const addProduct = async (req, res) => {
    const validatedProduct = await productValidation.validateAsync(req.body);
    if (validatedProduct.name && typeof validatedProduct.name === 'string') {
         validatedProduct.name = validatedProduct.name.trim();
    } else {
         return res.status(400).json({ success: false, message: "Product name is invalid." });
    }
    const name= validatedProduct.name
    const existingProduct = await Product.findOne({ name});
    if (existingProduct) {
      return res.status(400).json({ success: false, message: "Product already exists." });
    }
    const CategoryId=validatedProduct.category
    const categoryData = await Category.findById(CategoryId);
    if (!categoryData) {
      return res.status(401).json({ success: false, message: "Invalid category." });
    }
    
    const newProduct = new Product({
      ...validatedProduct
    });
    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "Product added successfully.",
      data: newProduct,
    });
  
};



export const updateProduct=async(req,res)=>{
  
    const productId=req.params.id;
    const productUpdate=req.body;
    if(!mongoose.Types.ObjectId.isValid(productId)){
      return res.status(400).json({success:false,message:"Invalid product id"})
    }
   const validatedProduct= await updateproductValidation.validateAsync(productUpdate)
    const updateDProduct=await Product.findByIdAndUpdate(productId,validatedProduct,{new:true})
    if(!updateDProduct){
      return res.status(404).json({success:false,message:"product not update"})
    }
    res.status(200).json({success:true,message:"Product updated successfully",updateDProduct})
  
}

export const hideProduct=async(req,res)=>{
    const productId=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(productId)){
      return res.status(400).json({success:false,message:"Invalid product id"})
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    const togleshow=!product.isShow;
    const hidedProduct=await Product.findByIdAndUpdate(productId,{ isShow: togleshow },{ new: true })
   if(!hidedProduct){
    return res.status(404).json({success:false,message:"Product not found"})
   }
   res.status(200).json({success:true,message:"Product hide successfully",data:hideProduct})
}


export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ success: false, message: "Invalid product id" });
      }
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return res.status(400).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({success: true,message: "Product deleted successfully",data: deleteProduct,});
  
};

