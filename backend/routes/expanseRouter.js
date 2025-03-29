const express=require("express");
const { addExpanse, allExpanses, expense, updateExpense, deleteExpense } = require("../controllers/addExpanseController");
const authMiddleware = require("../middlewares/authMiddleware");
const expanseRouter=express.Router();

expanseRouter.route("/addExpanse").post(authMiddleware,addExpanse)

expanseRouter.route("/allExpanses").get(authMiddleware, allExpanses)

expanseRouter.route("/expense/:id").get(authMiddleware,expense)

expanseRouter.route("/updateExpense/:id").put(authMiddleware,updateExpense)

expanseRouter.route("/deleteExpense/:id").delete(authMiddleware,deleteExpense)

module.exports=expanseRouter;