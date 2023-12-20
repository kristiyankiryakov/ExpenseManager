import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
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

incomeSchema.index({ date: 1 });

const Income = mongoose.model('Income', incomeSchema);

export default Income;
