
import mongoose from "mongoose";
import { productValidation, updateproductValidation } from "../../middlewares/joiValidation.js";
import Category from "../../models/categorySchema/category.js";
import Product from "../../models/productSchema/product.js";
import AppError from "../../middlewares/AppError.js";

export const addProduct = async (req, res) => {
    const validatedProduct = await productValidation.validateAsync(req.body);
    if (validatedProduct.name && typeof validatedProduct.name === 'string') {
         validatedProduct.name = validatedProduct.name.trim();
    } else {
      throw new AppError('Product name is invalid.',400)
    }
    const name= validatedProduct.name
    const existingProduct = await Product.findOne({ name});
    if (existingProduct) {
      throw new AppError('Product already exists.',400)

    }
    const CategoryId=validatedProduct.category
    const categoryData = await Category.findById(CategoryId);
    if (!categoryData) {
      throw new AppError('Invalid category.',401)
    }
    
    const newProduct = new Product({
      ...validatedProduct
    });
    await newProduct.save();
    res.status(200).json({success: true, message: "Product added successfully.", data: newProduct, });
  
};



export const updateProduct=async(req,res)=>{
    const productId=req.params.id;
    const productUpdate=req.body;
    if(!mongoose.Types.ObjectId.isValid(productId)){
      throw new AppError('Invalid product id',400)
    }
   const validatedProduct= await updateproductValidation.validateAsync(productUpdate)
    const updateDProduct=await Product.findByIdAndUpdate(productId,validatedProduct,{new:true})
    if(!updateDProduct){
      throw new AppError('product not update',404)

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
      throw new AppError('Product not found',404)
    }
    const togleshow=!product.isShow;
    const hidedProduct=await Product.findByIdAndUpdate(productId,{ isShow: togleshow },{ new: true })
   res.status(200).json({success:true,message:"Product hide successfully",data:hideProduct})
}


export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new AppError('Invalid product id',400)
      }
    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      throw new AppError('Product not found',404)
    }
    res.status(200).json({success: true,message: "Product deleted successfully",data: deleteProduct,});
};

