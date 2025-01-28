import express from 'express';
import { Login, registration } from '../controllers/authController/authController.js';
import { AllCategory } from '../controllers/baseController/categoryController.js';
import { GetSubCategory } from '../controllers/baseController/subCategoryController.js';
import { allProducts, getproductById, getProductsBycategory } from '../controllers/baseController/productController.js';

const router=express.Router()

router.post('/login',Login)
router.post('/registration',registration)
router.get('/category',AllCategory)
router.get('/subcategory',GetSubCategory)
router.get('/product',allProducts)
router.get('/product/:id',getproductById)
router.get('/product/category/:id',getProductsBycategory)

export default router