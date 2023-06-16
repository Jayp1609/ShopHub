const mongoose = require("mongoose");
require("dotenv").config();
const uri = "mongodb+srv://Jay:Jaypatel160902@cluster0.uu5wnnj.mongodb.net/ShopHub?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

const connectToMongo = () => {
  try {
    mongoose.connect(uri).then(console.log("Connection Successful!!!!!"));
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToMongo;
