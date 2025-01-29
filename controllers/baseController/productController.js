import mongoose from 'mongoose';
import Product from '../../models/productSchema/product.js';

export const getProductsBycategory = async (req, res) => {
        const  categoryId  = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(categoryId)){
            res.status(400).json({success:false,message:`Category Id  Invalid`})
        }
        
        const category=categoryId
        const products = await Product.find({ category} );
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products available for the given category" });
        }
        return res.status(200).json({ success: true, data: products, message: "Products fetched successfully" });
    
};

export const getproductById= async(req,res)=>{
    
        const productId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(productId)){
            throw new AppError('Product Id  Invalid',400)
        }
        const product=await Product.findById(productId)
        if(!product){
            throw new AppError(`product not available ${productId}`,400)
        }
        res.status(200).json({success:true,data:product,message:`product fetched by id successfully`})
}



export const allProducts=async(req,res)=>{
        const products=await Product.find();    
        if(!products.length){
            throw new AppError('Product Not Found',404)
        }
        res.status(200).json({success:true,data:products,message:"feth all products"})
}


  