import Category from "../../models/categorySchema/category.js";

export const AddCategory = async (req, res) => {
    let { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ success: false, message: "Category name is required." });
    }
    name = name.trim();
    try {
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ success: false, message: "Category already exists." });
      }
      const newCategory = new Category({ name });
      await newCategory.save();
      return res.status(200).json({success: true,message: "Category added successfully.", data: newCategory});
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "An error occurred while adding the category.",
        error: err.message,
      });
    }
  };
  