const mongoose = require('mongoose');

const subExpenseSchema = new mongoose.Schema({
    subExpenseName: {
        type: String,
        required: true
    },
    subExpenseAmount: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to User model
        ref: 'users',  // Assuming your user model collection is 'users'
        required: true
    },
    expenseId:{
        type: mongoose.Schema.Types.ObjectId,  // Reference to User model
        ref: 'expenses',  // Assuming your user model collection is 'users'
        required: true
    }
},
{timestamps:true}
);

const subExpanseModel = mongoose.model('subexpenses', subExpenseSchema);
module.exports = subExpanseModel;
