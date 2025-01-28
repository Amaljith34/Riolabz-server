import SubCategory from "../../models/categorySchema/subCategory.js";

export const GetSubCategory=async(req,res)=>{
    const categories = await SubCategory.find().populate('categoryId', 'name description');
    res.status(200).json({
      success: true,
      message: 'Success',
      data: categories,
    });
};