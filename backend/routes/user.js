const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const app = express();
app.use(express.json());

const bodySchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
}); 

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = bodySchema.safeParse(body);
    if (!success) {
        res.status(411).json({
            msg: "Email already taken / incorrect inputs",
        });
    }
    const userExist = await User.findOne({
        username: req.body.username,
    });
    if (userExist) {
        res.status(411).json({
            msg: "Email already taken / incorrect inputs",
        });
    }
    const user = User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    const userId = user._id;
    const token = jwt.sign(
        {
            userId,
        },
        JWT_SECRET
    );
    res.json({
        msg: "user created successfully",
        token: token,
    });
});

module.exports = router;
