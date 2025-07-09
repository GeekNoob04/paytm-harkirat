// const mongoose = require("mongoose");
// const express = require("express");
// const { string, number } = require("zod");
// const app = express();

// app.use(express.json());
// mongoose.connect(
//     "mongodb+srv://harshitbudhraja0:MongoKaPass@cluster0.nruhe7l.mongodb.net/"
// );
// const UserSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         minLength: 3,
//         maxLength: 30,
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 4,
//     },
//     firstName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50,
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50,
//     },
// });
// const AccountSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User", // user ke bina account mai kuch nhi dalega
//         required: true,
//     },
//     balance: {
//         type: Number,
//         required: true,
//     },
// });
// const Account = mongoose.model("Account", AccountSchema);
// const User = mongoose.model("User", UserSchema);
// module.exports = {
//     User,
//     Account,
// };

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { string, number } = require("zod");

app.use(express.json());
mongoose.connect(
    "mongodb+srv://harshitbudhraja0:MongoKaPass@cluster0.nruhe7l.mongodb.net/"
);

const UserSchema = new mongoose.Schema({
    username: {
        type: string,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: string,
        required: true,
        minLength: 4,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 5,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 5,
    },
});

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: number,
        required: true,
    },
});
const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = { User, Account };
