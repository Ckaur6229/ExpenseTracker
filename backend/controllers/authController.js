const User =require("../models/userModel");
const Budget = require("../models/budgetModel");
const bcrypt=require("bcryptjs");

//registration logic
const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password} = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Hash the password
    const saltround = 10;
    const hashPassword = await bcrypt.hash(password, saltround);

    // Create user
    const userCreate = await User.create({
      name,
      email,
      password: hashPassword,
      // contact,
    });

    // Create a budget entry with amount = 0 and totalExpense = 0 for the new user
    const budget = new Budget({ userId: userCreate._id, amount: 0, totalExpense: 0 });
    await budget.save();

    res.status(200).json({
      msg: "Registration successful",
      token: await userCreate.generateToken(),
      userId: userCreate._id.toString(),
      budget,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};


//login logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Send response only once with token, userId, and budget details
    res.status(200).json({
      msg: "Login successful",
      token: await userExists.generateToken(),
      userId: userExists._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { register,login };
