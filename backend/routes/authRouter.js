const express=require("express");
const { register,login } = require("../controllers/authController");
const router=express.Router();

// router.route("/").get((req,res)=>{
//   res.status(200).send("welcome")
// })

router.route("/register").post(register);

router.route("/login").post(login)


module.exports=router;