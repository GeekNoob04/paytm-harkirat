const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());
mongoose.connect(
    "mongodb+srv://harshitbudhraja0:MongoKaPass@cluster0.nruhe7l.mongodb.net/"
);
const UserSchema = new mongoose.Schema({
    usernmae: {
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
const User = mongoose.model("User", UserSchema);
module.exports = {
    User,
};
