const mongoose = require('mongoose');

const expanseSchema = new mongoose.Schema({
    expanseName: {
        type: String,
        required: true
    },
    expanseAmount: {
        type: Number,
        required: true
    },
    totalSpent: {
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

const expanseModel = mongoose.model('expenses', expanseSchema);
module.exports = expanseModel;
