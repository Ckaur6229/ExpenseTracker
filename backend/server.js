require("dotenv").config()

const express=require("express");
const cors=require("cors");
const router = require("./routes/authRouter");
const expanseRouter = require("./routes/expanseRouter");
const subExpenseRouter = require("./routes/subExpenseRoute");
const { ConnectDB } = require("./db/db");
const budgetRouter = require("./routes/budgetRouter");
const app=express();

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth",router)
app.use("/expanses",expanseRouter)
app.use("/subExpenses",subExpenseRouter)
app.use("/budget",budgetRouter)

//routes

const PORT=8080 || process.env.PORT

ConnectDB().then(()=>{
app.listen(PORT,()=>{
  console.log(`Server running at port : ${PORT}`)
})
})