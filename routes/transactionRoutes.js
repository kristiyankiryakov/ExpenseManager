import express from 'express'
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js';
import transactionController from '../controllers/transactionController.js';

router.route('/')
    .post(verifyJWT, transactionController.createTransaction)
    .get(verifyJWT, transactionController.getUserTransactions)

router.route('/schema')
    .get(verifyJWT, transactionController.getExpensesByMonth);


export default router