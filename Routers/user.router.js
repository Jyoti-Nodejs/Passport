const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const userController = require("../Controllers/users.controller");
const router = express.Router();

router.get("/users", (req, res) => {
  userController.getAllUser(req, res);
});

router.get("/:id", (req, res) => {
  userController.getOneUser(req, res);
});

router.put("/", (req, res) => {
  userController.updateUser(req, res);
});

router.delete("/:id", (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = router;
