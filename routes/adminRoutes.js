import express from 'express';
import { addProduct, deleteProduct, hideProduct, updateProduct } from '../controllers/adminController/productController.js';
import { AddCategory } from '../controllers/adminController/categoryController.js';
import { AddSubCategory } from '../controllers/adminController/subCategoryController.js';
import { ApproveRejectUser, toggluserBlock } from '../controllers/adminController/userController.js';

const router=express.Router()

router.post('/admin/product',addProduct)
router.route('/admin/product/:id')
.patch(hideProduct)
.put(updateProduct)
.delete(deleteProduct)
router.post('/admin/category',AddCategory)
router.post('/admin/subcategory/:id',AddSubCategory)
router.patch('/admin/block-unblock/:id',toggluserBlock)
router.patch('/admin/user/:id/status',ApproveRejectUser)


export default router