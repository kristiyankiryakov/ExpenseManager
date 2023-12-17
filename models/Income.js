import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

});

const Income = mongoose.model('Income', incomeSchema);

export default Income;
