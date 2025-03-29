const Budget = require("../models/budgetModel");
// const addBudget = async (req, res) => {
//   try {
//     const { amount } = req.body;
//     const userId = req.user.userId;
//     console.log(userId)
//     if (!amount) {
//       return res.status(400).json({ error: "All fields are required" });
//     }
//     let newBudget = new Budget({ amount, userId });
//     let result = await newBudget.save();
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const updateBudget = async (req, res) => {
  try {
    console.log(req.body);
    let result = await Budget.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );
    res.send(result);
    console.log(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBudget = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);

    // Fetch budget for the user with the given userId
    const budgets = await Budget.findOne({ userId });

    if (budgets) {
      // If a budget is found, send the budget data
      res.status(200).json(budgets);
    } else {
      // If no budget is found, send a message indicating no data
      res.status(200).send("No data found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { updateBudget,getBudget };
