import express from 'express';
import { Login, registration } from '../controllers/authController/authController.js';
import { AllCategory } from '../controllers/baseController/categoryController.js';
import { GetSubCategory } from '../controllers/baseController/subCategoryController.js';
import { allProducts, getproductById, getProductsBycategory } from '../controllers/baseController/productController.js';
import { trycatch } from '../middlewares/tryCatch.js';
import { checkAuth } from '../middlewares/authMiddleware.js';

const router=express.Router()

router.post('/login',trycatch(Login))
router.post('/registration',trycatch(registration))
router.get('/category',checkAuth,trycatch(AllCategory))
router.get('/subcategory',checkAuth,trycatch(GetSubCategory))
router.get('/product',checkAuth,trycatch(allProducts))
router.get('/product/:id',checkAuth,trycatch(getproductById))
router.get('/product/category/:id',checkAuth,trycatch(getProductsBycategory))

export default router