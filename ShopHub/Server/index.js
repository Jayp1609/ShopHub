const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
const app = express();
const port = 5000;

var cors = require("cors");
var path = require("path");

app.use(cors());

//Middleware
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/auth"));
//app.use("api/cart");

app.listen(port, () => {
  console.log(`ShopHub App listening on port ${port}`);
});
