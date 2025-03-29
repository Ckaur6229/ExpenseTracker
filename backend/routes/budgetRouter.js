const express=require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getBudget, updateBudget } = require("../controllers/budgetController");
const budgetRouter=express.Router();

budgetRouter.route("/updateBudget/:id").put(authMiddleware, updateBudget);
budgetRouter.route("/getBudget").get(authMiddleware, getBudget);
module.exports=budgetRouter
