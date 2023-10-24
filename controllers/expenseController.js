import asyncHandler from "express-async-handler";
import Expense from "../models/Expense.js";

const createNewExpense = asyncHandler(async (req, res) => {

  const { user, description, amount, date, category } = req.body;

  try {
    // Create a new expense document
    const newExpense = new Expense({
      user: user._id, // Assuming you have user data in the form of a 'User' document
      description: description,
      amount: amount,
      date: date,
      category: category,
    });

    // Save the expense to the database
    const savedExpense = await newExpense.save();

    return res.status(200).json(savedExpense);
  } catch (error) {
    return res.status(400).json({ message: 'Error creating expense:', error });
  }
})

const getUserExpenses = asyncHandler(async (req, res) => {

  const { userId, period } = req.query;
  const currentDate = new Date();
  const startDate = new Date(currentDate);

  if (period === 'day') {
    startDate.setDate(startDate.getDate() - 1); // Expenses for the last day
  } else if (period === 'week') {
    startDate.setDate(startDate.getDate() - 7); // Expenses for the last week
  } else if (period === 'month') {
    startDate.setMonth(startDate.getMonth() - 1); // Expenses for the last month
  } else {
    return res.status(400).json({ message: `Invalid period provided: ${period}` });
  }

  try {
    const expenses = await Expense.find({
      user: userId,
      date: { $gte: startDate, $lte: currentDate }, // Filter expenses within the specified period
    });

    return res.status(200).json(expenses);
  } catch (error) {
    return res.status(400).json({ message: 'Error retrieving expenses:', error });
  }
})


export default {
  createNewExpense,
  getUserExpenses
}