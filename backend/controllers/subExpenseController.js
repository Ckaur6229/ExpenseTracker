const SubExpenses=require("../models/subExpenseModel");
const Expanse = require("../models/expanseModel");
const addSubExp = async (req, res) => {
    try {
        const { subExpenseName, subExpenseAmount } = req.body;
        const userId=req.user.userId;
        const expenseId=req.params.id;
        console.log(expenseId);
        console.log(userId)
        // console.log(subExpenseName);
        // console.log(subExpenseAmount)
        // Validate request body
        if (!subExpenseName || !subExpenseAmount) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let newSubExpanse = new SubExpenses({subExpenseName,subExpenseAmount,userId,expenseId});
        let result = await newSubExpanse.save();
        await Expanse.findByIdAndUpdate(expenseId, {
            $inc: { totalSpent: subExpenseAmount }  // Increment totalSpent
        });
        res.status(201).json(result);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSubExpenses=async(req,res)=>{
    try {
        const expenseId=req.params.id;
        console.log(expenseId)
        let subExpenses= await SubExpenses.find({expenseId:expenseId});
    if(subExpenses.length>0){
        res.status(200).send(subExpenses)
    }
    else{
        res.status(200).send("No data found")
    }
    } catch (error) {
        res.status(500).json({error: error.message})
    } 
}

const deleteSubExpense = async (req, res) => {
    try {
        // Find the subExpense to get the expenseId
        const subExpense = await SubExpenses.findById(req.params.id);
        if (!subExpense) {
            return res.status(404).json({ error: "SubExpense not found" });
        }

        const { expenseId } = subExpense; // Get associated expenseId

        // Delete the subExpense
        await SubExpenses.deleteOne({ _id: req.params.id });

        // Recalculate totalSpent for the related expense
        const totalSpent = await SubExpenses.aggregate([
            { $match: { expenseId: subExpense.expenseId } },
            { $group: { _id: null, total: { $sum: "$subExpenseAmount" } } }
        ]);

        // Get the new totalSpent (if no subExpenses remain, set totalSpent to 0)
        const updatedTotal = totalSpent.length > 0 ? totalSpent[0].total : 0;

        // Update totalSpent in Expense model
        await Expanse.findByIdAndUpdate(expenseId, { totalSpent: updatedTotal });

        res.status(200).json({ message: "SubExpense deleted and totalSpent updated" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { addSubExp , getSubExpenses,deleteSubExpense};