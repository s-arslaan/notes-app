const dotenv = require("dotenv");
const mongoose = require("mongoose");

// getting db path from env
dotenv.config({path: './.env'});
const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
  mongoose.connect(mongoURI).then( () => {
    console.log("Connected to Mongo 💘");
  }).catch((err) => console.log(err));
};

module.exports = connectToMongo;
