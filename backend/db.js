const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());
mongoose.connect(
    "mongodb+srv://harshitbudhraja0:MongoKaPass@cluster0.nruhe7l.mongodb.net/"
);
const User = new mongoose.Schema({

});
