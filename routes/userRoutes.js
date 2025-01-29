import express from 'express';
import { addToCart, getCart, removeCart } from '../controllers/userController/cartController.js';
import { trycatch } from '../middlewares/tryCatch.js';
import { checkAuth } from '../middlewares/authMiddleware.js';

const router=express.Router()

router.route('/cart/:id')
.post(checkAuth,trycatch(addToCart))
.get(checkAuth,trycatch(getCart))
.delete(checkAuth,trycatch(removeCart))

export default router