import express from 'express'
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js';
import expenseController from '../controllers/expenseController.js';

router.route('/')
    .post(verifyJWT, expenseController.createNewExpense)
    .get(verifyJWT, expenseController.getUserExpenses) 

    
export default router