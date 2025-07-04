const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId,
    });
    res.json({
        balance: account.balance,
    });
});
router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        const { amount, to } = req.body;
        const account = await Account.findOne({
            userId: req.userId,
        }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                msg: "Invalid account",
            });
        }
        // ab  hogi transactions
        await Account.updateOne(
            {
                userId: req.userId,
            },
            {
                $inc: {
                    balance: -amount,
                },
            }
        ).session(session);
        await Account.updateOne(
            {
                userId: to,
            },
            {
                $inc: {
                    balance: amount,
                },
            }
        ).session(session);

        await session.commitTransaction();
        res.json({
            msg: "transaction successful",
        });
    } catch (e) {
        res.status(411).json({
            msg: "an error occured",
        });
    }
});
module.exports = router;
