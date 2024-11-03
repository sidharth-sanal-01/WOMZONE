const router = require("express").Router();
const Order = require("../Models/Order");
const {
  verifyTokenAuthorization,
  verifyTokenAdmin,
  verifyToken,
} = require("./verifyToken");

//create Order
router.post("/create", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log(err);
    res.status(408).json(err);
  }
});

//edit Order
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedOrder);
  } catch (err) {
    console.log(err);
    res.status(405).json(err);
  }
});



//get user orders
router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const foundOrder = await Order.findById(req.params.id);
    res.status(202).json(foundOrder);
  } catch (err) {
    res.status(404).json("Order not found!");
  }
});



//delete Orders !
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const foundOrder = await Order.findById(req.params.id);
    if (foundOrder) {
      await Order.findByIdAndDelete(req.params.id);
      res.status(202).json("Deleted Order");
    } else {
      res.status(407).json("Order not found!");
    }
  } catch (err) {
    res.status(407).json("Order not found!");
  }
});

//get all Orders
router.get("/allOrders", verifyTokenAdmin, async (req, res) => {
  const NewOrdersquery = req.query.new;
  try {
    if (NewOrdersquery) {
      const AllCart = await Cart.find({}).sort({ _id: -1 }).limit(1);
      res.status(200).json(AllCart);
    } else {
      const AllCart = await Cart.find({});
      res.status(200).json(AllCart);
    }
  } catch (err) {
    res.status(408).json("You are not an Admin!");
  }
});

module.exports = router;
