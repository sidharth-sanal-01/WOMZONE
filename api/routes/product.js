const router = require("express").Router();
const Product = require("../Models/Product");
const { verifyTokenAdmin } = require("./verifyToken");

//create product
router.post("/create", verifyTokenAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(408).json(err);
  }
});

//edit product
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(405).json(err);
  }
});

//get Product
router.get("/find/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const foundProduct = await Product.findById(req.params.id);
    res.status(202).json(foundProduct);
  } catch (err) {
    res.status(404).json("Product not found!");
  }
});

//delete Product !
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const foundUser = await Product.findById(req.params.id);
    if (foundUser) {
      await Product.findByIdAndDelete(req.params.id);
      res.status(202).json("Deleted Product");
    } else {
      res.status(407).json("Product not found!");
    }
  } catch (err) {
    res.status(407).json("Product not found!");
  }
});

//get all Products
router.get("/allproducts", verifyTokenAdmin, async (req, res) => {
  const NewProductsquery = req.query.new;
  const CategoryQuery = req.query.category;
  console.log("Reached hrere")
  try {
    if (NewProductsquery) {
      const AllProducts = await Product.find({}).sort({ _id: -1 }).limit(1);
      res.status(200).json(AllProducts);
    } else if (CategoryQuery) {
      const AllProducts = await Product.find({
        category: {
          $in: [CategoryQuery],
        },
      });
      res.status(200).json(AllProducts);
    } else {
      const AllProducts = await Product.find({});
      res.status(200).json(AllProducts);
    }
  } catch (err) {
    res.status(408).json("You are not an Admin!");
  }
});


module.exports = router;
