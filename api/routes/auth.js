const router = require("express").Router();
const User = require("../Models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_MESSAGE
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(501).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(402).json("User not found");

    const decrypted = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_MESSAGE
    );
    const originalPassword = decrypted.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(403).json("Password Incorrect");

    const accessToken = jwt.sign(
      {
        _id: user._id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SEC,{expiresIn:"365d"}
    );

    console.log(accessToken);
    const { password, ...others } = user._doc;
    res.status(200).json({...others,accessToken});
  } catch (err) {
    res.status(502).json(err);
  }
});

module.exports = router;
