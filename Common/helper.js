const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
process.env.TOKEN_SECRET;
// const { check, validationResult } = require("express-validator");

function generateToken(userData) {
  return jwt.sign(userData, process.env.TOKEN_SECRET);
}

function decodeToken(token, res) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        resolve(result);
      }
    });
  });
}

function comparePass(Password, hash) {
  try {
    return bcrypt.compare(Password, hash);
  } catch (err) {
    return false;
  }
}
//verify token
async function validateJWTToken(req, res, next) {
  try {
    const authToken = req.headers.authorization;
    const authArr = authToken.split(" ");
    const token = authArr[1];
    if (token == null) {
      return res.status(401).json({
        message: err.message,
      });
    } else {
      const result = await decodeToken(token, res);
      req.user = result;
      console.log("result : ", result);
      next();
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

// async function bodyValidation(req, res, next) {
//   // check("name").not().isEmpty().withMessage("Name is required"),
//   check("email", "Your email is not valid").isEmail().isEmpty(),
//   check("username", "Your username must be at least 8 characters")
//     .isEmpty()
//     .isLength({ min: 8 }),
//   check("password", "Your password must be at least 8 characters")
//     .isEmpty()
//     .isLength({ max: 8 });
//   const errors = await validationResult(req);
//   console.log(req.body);
//   if (errors) {
//     return res.status(400).json({ message: errors });
//   } else {
//     res.status(500).json({ message: "Validated successfully" });
//   }
//   next();
// }

module.exports = {
  generateToken,
  comparePass,
  validateJWTToken,
  //bodyValidation,
};
