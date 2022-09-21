const express = require("express");
const bodyParser = require("body-parser");
const authController = require("../Controllers/auth.controller");
const { checkSchema } = require("express-validator");
const signupSchema = require("../Validator/signup.validate");
const loginSchema = require("../Validator/login.validate");
const verifyOtpSchema = require("../Validator/verifyOtp.validate");

const router = express.Router();
const app = express();
app.use(bodyParser.json());

router.post("/login", checkSchema(loginSchema), (req, res) => {
  authController.loginUser(req, res);
});

router.post("/signup", checkSchema(signupSchema), (req, res) => {
  authController.signup(req, res);
});

// [
//   check("name").not().isEmpty().withMessage("Name is required"),
//   check("email", "Your email is not valid").isEmail().not().isEmpty(),
//   check("username", "Your username must be at least 8 characters")
//     .isEmpty()
//     .isLength({ min: 8 }),
//   check("password", "Your password must be at least 8 characters")
//     .not()
//     .isEmpty()
//     .isLength({ max: 8 }),
// ],
// (req, res) => {
// const errors = validationResult(req);
// if (!errors.isEmpty()) {
//   return res.status(400).json({ errors: errors.array() });
// } else {
//   res.status(500).json({ message: "Validated successfully" });
// }
//     authController.signup(req, res);
//   }
// );

router.get("/verify_otp", checkSchema(verifyOtpSchema), (req, res) => {
  authController.verifyOtp(req, res);
});

// router.get("/password", (req, res) => {
//   authController.forgetPassword(req, res);
// });

module.exports = router;
