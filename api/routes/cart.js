const router = require("express").Router();
const Cart = require("../Models/Cart");
const {
  verifyTokenAuthorization,
  verifyTokenAdmin,
  verifyToken,
} = require("./verifyToken");

//create product
router.post("/create", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    console.log(err);
    res.status(408).json(err);
  }
});

//edit Cart
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedCart);
  } catch (err) {
    console.log(err);
    res.status(405).json(err);
  }
});

//update items in Cart
router.put("/updatecart/:id", verifyToken, async (req, res) => {
  const query = req.query.action;
  try {
    if (query === "add") {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        { $push: { products: req.body } },
        { new: true }
      );
      res.status(201).json(updatedCart);
    } else if (query === "remove") {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        { $pull: { products: { productId: req.body.productId } } },
        { new: true }
      );
      res.status(201).json(updatedCart);
    }
  } catch (err) {
    console.log(err);
    res.status(405).json(err);
  }
});

//get Cart
router.get("/find/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    const foundCart = await Cart.find({ userId: req.params.id });
    if (foundCart.length===0) {
      const newCart = new Cart({ userId: req.params.id, products: [] });
      res.status(200).json(newCart);
    } else {
      res.status(200).json(foundCart[0]);
      console.log(foundCart[0])
    }
  } catch (err) {
    res.status(404).json("Cart not found!");
  }
});

//delete Cart !
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const foundCart = await Cart.findById(req.params.id);
    await Cart.findByIdAndDelete(req.params.id);
    res.status(202).json("Deleted Cart");
  } catch (err) {
    res.status(407).json("Cart not found!");
  }
});

//get all Carts
router.get("/allcarts", verifyTokenAdmin, async (req, res) => {
  const NewProductsquery = req.query.new;
  const CategoryQuery = req.query.category;
  try {
    if (NewProductsquery) {
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
