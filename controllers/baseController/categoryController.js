import Category from "../../models/categorySchema/category.js";

export const AllCategory= async (req, res) => {
  try {
    const categories = await Category.find()
    .populate({
        path: 'subcategories', 
        select: 'name description', 
      }); 

    res.status(200).json({ success: true, message:"Category Fetch Successfully ",data:categories });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch categories", error: err.message });
  }
};