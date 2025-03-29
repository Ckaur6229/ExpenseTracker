const express=require("express");
const { addSubExp, getSubExpenses, deleteSubExpense } = require("../controllers/subExpenseController");
const authMiddleware = require("../middlewares/authMiddleware");
const subExpenseRouter=express.Router();

subExpenseRouter.route("/add/:id").post(authMiddleware, addSubExp);
subExpenseRouter.route("/allSubExpenses/:id").get(authMiddleware, getSubExpenses);
subExpenseRouter.route("/deleteSubExpenses/:id").delete(authMiddleware, deleteSubExpense);
module.exports=subExpenseRouter
