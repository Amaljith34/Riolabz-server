import Category from "../../models/categorySchema/category.js";

export const AllCategory= async (req, res) => {
    const categories = await Category.find()
    .populate({
        path: 'subcategories', 
        select: 'name description', 
      }); 

    res.status(200).json({ success: true, message:"Category Fetch Successfully ",data:categories });
};