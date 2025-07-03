import JWT_SECRET from "../config";

const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(403).json({
            msg: "invalid token",
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        }
    } catch (e) {
        return res.status(403).json({
            msg: "invalid token",
        });
    }
};
module.exports = { authMiddleware };
