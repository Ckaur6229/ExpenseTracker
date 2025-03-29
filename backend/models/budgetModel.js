const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default:0
    },
    totalExpense: {
        type: Number,
        default: 0  // Default value should be 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to User model
        ref: 'users',  // Assuming your user model collection is 'users'
        required: true
    }
},
{timestamps:true}
);

const budgetModel = mongoose.model('budget', budgetSchema);
module.exports = budgetModel;
