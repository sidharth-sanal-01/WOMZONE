const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const { verifyTokenAuthorization, verifyTokenAdmin } = require("./verifyToken");

//edit user
router.put("/:id", verifyTokenAuthorization, async (req, res) => {
  console.log('Reached here')
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_MESSAGE
    ).toString();

    console.log(req.body.password);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(405).json(err);
  }
});

//get user
router.get("/find/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    const { password, ...other } = foundUser._doc;
    res.status(202).json(other);
  } catch (err) {
    res.status(404).json("User not found!");
  }
});

//delete user !
router.delete("/:id", verifyTokenAuthorization, async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (foundUser) {
      await User.findByIdAndDelete(req.params.id);
      res.status(202).json("Deleted User");
    } else {
      res.status(407).json("User not found!");
    }
  } catch (err) {
    res.status(407).json("User not found!");
  }
});

//get all users
router.get("/allUsers", verifyTokenAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const allUsers = query
      ? await User.find({}).sort({ _id: -1 }).limit(1)
      : await User.find({});
    res.status(201).json(allUsers);
  } catch (err) {
    res.status(408).json("You are not an Admin!");
  }
});



//get stats of users
router.get("/stats", verifyTokenAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    console.log(err)
    res.status(404).json(err);
  }
});

module.exports = router;
