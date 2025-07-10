const JWT_SECRET = require("../config");

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
/*
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(403).json({
            msg: "invalid token",
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId; // so that other routes and middlewares can use it
            next();
        }
    } catch (e) {
        return res.status(403).json({
            msg: "something went wrong",
        });
    }
};

module.exports = { authMiddleware };
*/
