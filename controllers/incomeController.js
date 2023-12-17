import asyncHandler from "express-async-handler";
import Income from "../models/Income.js";

const saveIncome = asyncHandler(async (req, res) => {

    const { user, amount, month } = req.body;

    try {
        const income = new Income({
            amount: amount,
            month: month,
            user: user._id,
        });

        const newIncome = await income.save();

        return res.status(200).json({ message: `Saved income of ${newIncome.amount} for month ${newIncome.month}` });
    } catch (error) {
        return res.status(400).json({ message: 'Error saving income:', error });
    }
})

const getYearlyIncomeByMonth = asyncHandler(async (req, res) => {

    const { userId, } = req.query;

    try {
        const income = await Income.find({ user: userId }, '-_id -user -__v');

        return res.status(200).json({ income });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: `Error trying to retrieve income ${error}` });
    }
})


export default {
    saveIncome,
    getYearlyIncomeByMonth,
}