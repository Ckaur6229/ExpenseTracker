const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    { timestamps: true }
);

userSchema.methods.generateToken = function () {
    try {
        if (!process.env.JWT_KEY) throw new Error("JWT_KEY is missing");

        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
        );
    } catch (error) {
        console.error("Token generation error:", error);
        return null;
    }
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
