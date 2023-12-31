import asyncHandler from "express-async-handler";
import Transaction from "../models/Transaction.js";
// const moment = require('moment');
import moment from 'moment';
import mongoose from "mongoose";

const createTransaction = asyncHandler(async (req, res) => {

  const { user, description, amount, date, category, type } = req.body;

  try {

    const transaction = new Transaction({
      user: user._id,
      description: description,
      type: type,
      amount: amount,
      date: date,
      category: category,
    });


    const savedTransaction = await transaction.save();

    return res.status(200).json(savedTransaction);
  } catch (error) {
    return res.status(400).json({ message: 'Error creating expense:', error });
  }
})

const getUserTransactions = asyncHandler(async (req, res) => {

  const { userId, period, type, format } = req.query;
  const currentDate = new Date();
  let startDate = new Date(currentDate);
  let endDate;

  if (period === 'day') {
    startDate.setDate(startDate.getDate() - 1);
  } else if (period === 'week') {
    const currentDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, and so on
    const daysToMonday = currentDay === 0 ? 6 : currentDay - 1; // Calculate days to Monday

    startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - daysToMonday);
    startDate.setUTCHours(0, 0, 0, 0);

    endDate = new Date(startDate);

    // Ensure the endDate represents the Sunday of the current week
    endDate.setDate(startDate.getDate() + 5);
    endDate.setUTCHours(23, 59, 59, 999);
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
      const allTransactions = await Transaction.find({ user: userId, type: type });
      return res.status(200).json(allTransactions);
    } catch (error) {
      return res.status(400).json({ message: `Error retrieving all transactions of type: ${type}`, error });
    }
  } else {
    return res.status(400).json({ message: `Invalid period provided: ${period}` });
  }

  try {
    const period = { startDate, endDate };
    const transactions = await Transaction.find({
      user: userId,
      type: type,
      date: { $gte: startDate, $lte: endDate ?? currentDate }, // Filter expenses within the specified period
    });

    const response = { transactions, period }

    if (format) {
      const transactionsByCategory = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.category]) {
          acc[transaction.category] = 0;
        }
        acc[transaction.category] += transaction.amount;
        return acc;
      }, {});
      response.formatted = transactionsByCategory
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: `Error retrieving transactions of type: ${type}`, error });
  }
})

const getYearlyTransactionsByMonth = asyncHandler(async (req, res) => {
  const currentYear = moment().year();
  const { userId, type } = req.query;

  try {
    const transactions = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          type: type,
          date: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`)
          }
        }
      },
      {
        $group: {
          _id: {
            $month: {
              date: "$date",
              timezone: 'Europe/Sofia'
            }
          },
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    const monthlyTransactions = transactions.map((item) => {
      const monthName = moment().month(item._id - 1).format("MMM"); // Adjusted this line
      return { month: monthName, total: item.totalAmount };
    });

    return res.status(200).json({ monthlyTransactions, type: type });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: `error retrieving transactions of type ${type}`, error });
  }

})

export default {
  createTransaction,
  getUserTransactions,
  getYearlyTransactionsByMonth,
}