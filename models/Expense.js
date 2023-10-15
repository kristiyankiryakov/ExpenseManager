import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        // required: true,
    },
    category: {
        type: String,
        required: true,
    },
    // You can add more fields as needed, e.g., payment method, location, etc.

    // Optionally, you can use the following fields to enable time-based queries:
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// You might want to index the 'date' field for efficient date-based queries.
expenseSchema.index({ date: 1 });

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense
