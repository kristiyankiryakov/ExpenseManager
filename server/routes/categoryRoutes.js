import express from 'express'
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js';
import categoryController from '../controllers/categoryController.js';

router.route('/')
    .post(verifyJWT, categoryController.createCategory)
    .get(verifyJWT, categoryController.getCategories)


export default router