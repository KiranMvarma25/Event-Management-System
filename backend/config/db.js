const mongoose = require('mongoose');

// let url = "mongodb://localhost:27017/";
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.url)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("Error in connecting to DB"))
}

module.exports = dbConnect;