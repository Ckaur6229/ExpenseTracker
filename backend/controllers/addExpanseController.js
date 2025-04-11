const Expanse = require("../models/expanseModel");
const Budget = require("../models/budgetModel");
const SubExpenses=require("../models/subExpenseModel");

const addExpanse = async (req, res) => {
  try {
    const { expanseName, expanseAmount } = req.body;
    const userId = req.user.userId; 
    console.log('User ID:', userId);

    // Validate request body
    if (!expanseName || !expanseAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user's budget by userId
    const budget = await Budget.findOne({ userId }).select('_id totalExpense amount');
    if (!budget) {
      return res.status(404).json({ MessageChannel: 'Budget not found for the user' });
    }
    
    console.log("Budget ID:", budget._id);
    if(budget.amount===budget.totalExpense){
      return res.status(404).json({ message: "You don't have enough Budget" });
    }

    // Save new expense
    const newExpanse = new Expanse({ expanseName, expanseAmount, userId });
    await newExpanse.save();

    // Update the totalExpense field in the Budget model for the logged-in user
    await Budget.findByIdAndUpdate(budget._id, {
      $inc: { totalExpense: expanseAmount }  // Increment totalExpense
    });

    res.status(201).json({ message: "Expense added and budget updated!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const allExpanses = async (req, res) => {
  try {
    let expanses = await Expanse.find({ userId: req.user.userId });
    if (expanses.length > 0) {
      res.status(200).send(expanses);
    } else {
      res.status(200).send("No data found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const expense = async (req, res) => {
  try {
    const result = await Expanse.findOne({ _id: req.params.id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(200).send({ result: "No record found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {

  try {
    const userId = req.user.userId; 
    console.log("UID",userId)
    console.log(req.body);
    const existingExpense = await Expanse.findOne({ _id: req.params.id});
    
    if (!existingExpense) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    const result = await Expanse.findOneAndUpdate(
      { _id: req.params.id, userId: userId }, // Ensure only user's expenses are updated
      { $set: req.body },
      { new: true } // Return updated document
    );

    if (!result) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    res.json(result);
    const oldAmount = existingExpense.expanseAmount;
    const newAmount=result.expanseAmount
    const diff=Math.abs(oldAmount-newAmount)
    console.log("diff",diff)

    const budget = await Budget.findOne({ userId }).select('_id totalExpense');
    console.log(budget)

    if (budget) {
        if(oldAmount>newAmount){
          await Budget.findByIdAndUpdate(budget._id, {
            $inc: { totalExpense: -diff}
          });
        }else{
          await Budget.findByIdAndUpdate(budget._id, {
            $inc: { totalExpense: diff}
          });
        }
    }
    // console.log(updatedExpense)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const DelAmount = await Expanse.findById(req.params.id).select('_id expanseAmount');
    if (!DelAmount) {
      return res.status(404).json({ message: "Expense not found" });
    }
    console.log(DelAmount)
    let result = await Expanse.deleteOne({ _id: req.params.id });
    res.status(200).send(result);

    await SubExpenses.deleteMany({expenseId:req.params.id})
    const budget = await Budget.findOne({ userId }).select('_id totalExpense');
    const newAmount=DelAmount.expanseAmount
    await Budget.findByIdAndUpdate(budget._id, {
      $inc: { totalExpense: -newAmount}
    });
    console.log(budget)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  addExpanse,
  allExpanses,
  expense,
  updateExpense,
  deleteExpense,
};
