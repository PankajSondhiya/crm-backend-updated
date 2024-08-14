const jwt = require("jsonwebtoken");
const SECRET_KEY = require("../configs/auth.config");

function isAdmin(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(403).send("Token is not present");
  }

  jwt.verify(token, SECRET_KEY, function (err, decoded) {
    if (err) {
      res.status(403).send("Invalid token");
    } else if (decoded.userType === "ADMIN") {
      next();
    } else {
      res.status(403).send("Only admins can call this API");
    }
  });
}

function verifyJwtToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.status(401).send("Token is not present");
  }

  jwt.verify(token, SECRET_KEY, function (err, decoded) {
    if (err) {
      res.status(401).send("Unauthenticated user");
    } else {
      req.userId = decoded.userId;
      req.userType = decoded.userType;
      next();
    }
  });
}

module.exports = {
  isAdmin,
  verifyJwtToken,
};

// Req => Function1 => Function2 => Function3 => Res

// 1. Middleware will ony call next
// 2. Middleware will stop the pipeline by sending an error
