const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Token is required" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const isVerified = jwt.verify(token, process.env.JWT_KEY);
        console.log("Verified User:", isVerified);

        req.user = isVerified;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
};


module.exports = authMiddleware;
