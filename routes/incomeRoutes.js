import express from 'express'
const router = express.Router()
import verifyJWT from '../middleware/verifyJWT.js';
import incomeController from "../controllers/incomeController.js"

router.route('/')
    .post(verifyJWT, incomeController.saveIncome)
    .get(verifyJWT, incomeController.getYearlyIncomeByMonth)


export default router