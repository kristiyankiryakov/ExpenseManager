import asyncHandler from "express-async-handler";
import Expense from "../models/Expense.js";

const createNewExpense = asyncHandler(async (req, res) => {

    const {userData, description,amount,date, category} = req.body;

    try {
        // Create a new expense document
        const newExpense = new Expense({
          user: userData._id, // Assuming you have user data in the form of a 'User' document
          description: description,
          amount: amount,
          date: date,
          category: category,
        });
    
        // Save the expense to the database
        const savedExpense = await newExpense.save();
    
        return res.status(200).json(savedExpense);
      } catch (error) {
        return res.status(400).json({message:'Error creating expense:', error});
      }
})


export default {
    createNewExpense
}