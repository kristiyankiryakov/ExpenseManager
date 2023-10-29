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
  let startDate = new Date(currentDate);
  let endDate;

  if (period === 'day') {
    startDate.setDate(startDate.getDate() - 1); // Expenses for the last day
  } else if (period === 'week') {
    // startDate.setDate(startDate.getDate() - 7); // Expenses for the last week

    const dayOfWeek = currentDate.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 1 ? 0 : (dayOfWeek === 0 ? -6 : 1)); // Calculate the start date (Monday)
    startDate = new Date(currentDate.setDate(diff));
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + (6 - dayOfWeek + 1)); // (6 - dayOfWeek + 1) gives the remaining days till Sunday

  } else if (period === 'month') {
    // startDate.setMonth(startDate.getMonth() - 1); // Expenses for the last month
    startDate.setDate(1); // Set the start date to the 1st day of the current month

    // Calculate the end date (last day of the current month)
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    endDate = new Date(nextMonth - 1);

  } else if (period === 'year') {
    // startDate.setFullYear(startDate.getFullYear() - 1); // Expense for the last year
    startDate.setMonth(0); // Set the start date to the 1st day of January of the current year
    startDate.setDate(1);

    // Calculate the end date (last day of December of the current year)
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
    const expenses = await Expense.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate ?? currentDate }, // Filter expenses within the specified period
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