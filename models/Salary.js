const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    month: {
        type: String, // e.g., "January 2024"
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    datePaid: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Salary', salarySchema);
