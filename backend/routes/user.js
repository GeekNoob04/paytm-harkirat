// const express = require("express");
// const router = express.Router();
// const zod = require("zod");
// const jwt = require("jsonwebtoken");
// const { User, Account } = require("../db");
// const JWT_SECRET = require("../config");
// const { authMiddleware } = require("../middlewares/middleware");
// const app = express();
// app.use(express.json());

// const bodySchema = zod.object({
//     username: zod.string().email(),
//     password: zod.string(),
//     firstName: zod.string(),
//     lastName: zod.string(),
// });

// router.post("/signup", async (req, res) => {
//     const body = req.body;
//     const { success } = bodySchema.safeParse(body);
//     if (!success) {
//         res.status(411).json({
//             msg: "Email already taken / incorrect inputs",
//         });
//     }
//     const userExist = await User.findOne({
//         username: req.body.username,
//     });
//     if (userExist) {
//         res.status(411).json({
//             msg: "Email already taken / incorrect inputs",
//         });
//     }
//     const user = await User.create({
//         username: req.body.username,
//         password: req.body.password,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//     });
//     const userId = user._id;

//     await Account.create({
//         userId,
//         balance: 1 + Math.random() * 10000,
//     });

//     const token = jwt.sign(
//         {
//             userId,
//         },
//         JWT_SECRET
//     );
//     res.json({
//         msg: "user created successfully",
//         token: token,
//     });
// });
// const signInBody = zod.object({
//     username: zod.string().email(),
//     password: zod.string(),
// });
// router.post("/signin", async (req, res) => {
//     const { success } = signInBody.safeParse(req.body);
//     if (!success) {
//         return res.status(411).json({
//             msg: "Email already taken / incorrect inputs",
//         });
//     }
//     const user = await User.findOne({
//         username: req.body.username,
//         password: req.body.password,
//     });
//     if (user) {
//         const token = jwt.sign(
//             {
//                 userId: user._id,
//             },
//             JWT_SECRET
//         );
//         res.json({
//             token: token,
//         });
//         return;
//     }
//     res.status(411).json({
//         msg: "Error while logging in",
//     });
// });
// const updateBody = zod.object({
//     password: zod.string().optional(),
//     firstName: zod.string().optional(),
//     lastName: zod.string().optional(),
// });
// router.put("/", authMiddleware, async (req, res) => {
//     const { success } = updateBody.safeParse(req.body);
//     if (!success) {
//         res.status(411).json({
//             msg: "Error while updating information",
//         });
//     }
//     await User.updateOne(req.body, {
//         _id: req.userId,
//     });
//     res.json({
//         msg: "Updated Successfully",
//     });
// });
// router.get("/bulk", async (req, res) => {
//     const filter = req.query.filter || "";
//     const users = await User.find({
//         $or: [
//             {
//                 firstName: {
//                     $regex: filter,
//                 },
//             },
//             {
//                 lastName: {
//                     $regex: filter,
//                 },
//             },
//         ],
//     });
//     res.json({
//         user: users.map((user) => ({
//             username: user.username,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             _id: user._id,
//         })),
//     });
// });
// module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middlewares/middleware");
const app = express();
const router = express.Router();
app.use(express.json());

const bodySchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
});
router.post("/signup", async (req, res) => {
    const { success } = bodySchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            msg: "incorrect inputs",
        });
    }
    const userExist = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });
    if (userExist) {
        res.status(411).json({
            msg: "user already exists",
        });
    }
    const user = await User.create({
        username,
        password,
        firstName,
        lastName,
    });
    const userId = user._id;
    const token = jwt.sign(
        {
            userId,
        },
        JWT_SECRET
    );
    res.json({
        msg: "Sign up successfull",
        token: token,
    });
});

const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
});

router.post("/signin", async (req, res) => {
    const { success } = signinSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            msg: "acoount does not exist",
        });
    }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });
    if (user) {
        const token = jwt.sign(
            {
                userId: user._id,
            },
            JWT_SECRET
        );
        req.json({
            token,
        });
        return;
    }
    res.status(403).json({
        msg: "error while logging in",
    });
});

const updateBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
});

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            msg: "error while updating info",
        });
    }
    await User.updateOne({ _id: req.userId }, req.body); //Update the user whose _id is req.userId with the new values in req.body
    res.json({
        msg: "updated successfuly",
    });
});
router.get("/bulk", async (req, res) => {
    // NAHI AAYA SAMAJH
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: filter,
                },
            },
            {
                lastName: {
                    $regex: filter,
                },
            },
        ],
    });
    res.json({
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        })),
    });
});
module.exports = router;
