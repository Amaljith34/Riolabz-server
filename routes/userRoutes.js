import express from 'express';
import { addToCart, getCart, removeCart } from '../controllers/userController/cartController.js';

const router=express.Router()

router.route('/user/cart/:id')
.post(addToCart)
.get(getCart)
.delete(removeCart)

export default router