import AppError from "../../middlewares/AppError.js";
import Category from "../../models/categorySchema/category.js";

export const AddCategory = async (req, res) => {
    let { name } = req.body;
    if (!name || name.trim() === "") {
      throw new AppError('Category name is required.',400)
    }
    name = name.trim();
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        throw new AppError('Category already exists.',400)
      }
      const newCategory = new Category({ name });
      await newCategory.save();
      return res.status(200).json({success: true,message: "Category added successfully.", data: newCategory});
    
  };
  