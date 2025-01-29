import express from 'express';
import { addProduct, deleteProduct, hideProduct, updateProduct } from '../controllers/adminController/productController.js';
import { AddCategory } from '../controllers/adminController/categoryController.js';
import { AddSubCategory } from '../controllers/adminController/subCategoryController.js';
import { ApproveRejectUser, toggluserBlock } from '../controllers/adminController/userController.js';
import { trycatch } from '../middlewares/tryCatch.js';
import { checkAuth } from '../middlewares/authMiddleware.js';
import { checkAdmin } from '../middlewares/adminMiddleware.js';

const router=express.Router()

router.post('/product',checkAuth,checkAdmin,trycatch(addProduct))
router.route('/product/:id')
.patch(checkAuth,checkAdmin,trycatch(hideProduct))
.put(checkAuth,checkAdmin,trycatch(updateProduct))
.delete(checkAuth,checkAdmin,trycatch(deleteProduct))
router.post('/category',checkAuth,checkAdmin,trycatch(AddCategory))
router.post('/subcategory/:id',checkAuth,checkAdmin,trycatch(AddSubCategory))
router.patch('/block-unblock/:id',checkAuth,checkAdmin,trycatch(toggluserBlock))
router.patch('/user/:id/status',checkAuth,checkAdmin,trycatch(ApproveRejectUser))


export default router