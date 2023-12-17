import asyncHandler from "express-async-handler";
import Expense from "../models/Expense.js";
// const moment = require('moment');
import moment from 'moment';
import mongoose from "mongoose";

const createNewExpense = asyncHandler(async (req, res) => {

  const { user, description, amount, date, category } = req.body;

  try {

    const newExpense = new Expense({
      user: user._id,
      description: description,
      amount: amount,
      date: date,
      category: category,
    });


    const savedExpense = await newExpense.save();

    return res.status(200).json(savedExpense);
  } catch (error) {
    return res.status(400).json({ message: 'Error creating expense:', error });
  }
})

const getUserExpenses = asyncHandler(async (req, res) => {

  const { userId, period } = req.query;
  const currentDate = new Date();
  let startDate = new Date(currentDate);
  let endDate;

  if (period === 'day') {
    startDate.setDate(startDate.getDate() - 1);
  } else if (period === 'week') {

    const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, and so on
    const diffToMonday = currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Calculate days to Monday

    startDate = new Date(currentDate.setDate(diffToMonday));
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // Sunday

  } else if (period === 'month') {
    startDate.setDate(1); // Set the start date to the 1st day of the current month

    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    endDate = new Date(nextMonth - 1);

  } else if (period === 'year') {
    startDate.setMonth(0);
    startDate.setDate(1);

    endDate = new Date(currentDate.getFullYear(), 11, 31);
  } else if (!period) {
    try {
      const allExpenses = await Expense.find({ user: userId });
      return res.status(200).json(allExpenses);
    } catch (error) {
      return res.status(400).json({ message: 'Error retrieving all expenses:', error });
    }
  } else {
    return res.status(400).json({ message: `Invalid period provided: ${period}` });
  }

  try {
    const period = { startDate, endDate };
    const expenses = await Expense.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate ?? currentDate }, // Filter expenses within the specified period
    });

    const expensesByCategory = expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.amount;
      return acc;
    }, {});

    return res.status(200).json({ expenses, expensesByCategory, period });
  } catch (error) {
    return res.status(400).json({ message: 'Error retrieving expenses:', error });
  }
})

const getExpensesByMonth = asyncHandler(async (req, res) => {
  const currentYear = moment().year();
  const { userId } = req.query;

  try {
    const expenses = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: { $month: "$date" },
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    const monthlyExpenses = expenses.map((item) => {
      const monthName = moment().month(item._id - 1).format("MMM"); // Adjusted this line
      return { month: monthName, Expense: item.totalAmount };
    });

    return res.status(200).json({ monthlyExpenses });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'error retrieving expenses', error });
  }

})


export default {
  createNewExpense,
  getUserExpenses,
  getExpensesByMonth,
}