const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    incurred_on: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    updated: Date,
       
});

module.exports = Expense = mongoose.model('expense', ExpenseSchema);