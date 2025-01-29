import Category from "../../models/categorySchema/category.js";
import SubCategory from "../../models/categorySchema/subCategory.js";

  export const AddSubCategory = async (req, res) => {
    const categoryId=req.params.id
    const { name } = req.body;
    if (!categoryId) {
        throw new AppError('Category ID is required.',400)
    }
    const existingSubCategory = await SubCategory.findOne({ name: name.trim() });
    if (existingSubCategory) {
        throw new AppError('Subcategory already exists.',400)
    }
    const newSubCategory = new SubCategory({
        name: name,
        categoryId,
        isDeleted: false,
    });
    await newSubCategory.save();
    await Category.findByIdAndUpdate(categoryId, {
        $push: { subcategories: newSubCategory._id }, 
    });
    res.status(201).json({success: true,message: 'Subcategory added successfully.',data: newSubCategory,});
};



      
export const FetchSubCategory = async (req, res) => {
    const categories = await Category.find({ isDeleted: false })
      .populate('subcategories'); 
    res.status(200).json({ success: true,message: 'Success',data: categories,});
};