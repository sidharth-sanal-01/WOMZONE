const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) {
    return res.status(400).json("Token has expired")
  }
  console.log("Auth header: ", authHeader.split(" "))
  if (authHeader.split(" ")[0] == "bearer") {
    var token = authHeader.split(" ")[1];
  } else {
    var token = authHeader.split(" ")[0];   
  }
  console.log("Token is present",token)
  if (token) {
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(404).json("Token has expired");
      console.log(req.user)
      req.user = user;
      next();
    });
  } else {
    res.status(405).json("You are not Authorized to do that!");
  }
};

const verifyTokenAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.id ) {
        next()
    } else {
      res.status(403).json("You are not Authorised to do that");
    }
  });
};



const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
        next()
    } else {
      res.status(409).json("You are not Authorised to do that");
    }
  });
};



module.exports={verifyTokenAuthorization,verifyTokenAdmin,verifyToken}