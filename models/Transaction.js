import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ['expense', 'income'],
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
        required: true,
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

transactionSchema.index({ date: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
