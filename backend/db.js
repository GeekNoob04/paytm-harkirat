const mongoose = require("mongoose");
const express = require("express");
const { string, number } = require("zod");
const app = express();

app.use(express.json());
mongoose.connect(
    "mongodb+srv://harshitbudhraja0:MongoKaPass@cluster0.nruhe7l.mongodb.net/"
);
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
});
const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // user ke bina account mai kuch nhi dalega
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
});
const Account = mongoose.model("Account", AccountSchema);
const User = mongoose.model("User", UserSchema);
module.exports = {
    User,
    Account,
};
