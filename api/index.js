const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paymentRoute = require("./routes/stripe");
var cors = require("cors");
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("CONNECTED TO THE DATABASE"))
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

//middle ware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(cors());

app.get("/", function (req, res, next) {
  //   res.json({msg: 'Welcome to ECOMMERCE API!'})
  res.send("WELCOME TO ECOMMERCE API");
});



//routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payments", paymentRoute);


app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server is up and running in port " + PORT);
  }
});
