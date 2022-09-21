const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
const likeController = require("../Controllers/likes.controller");
const router = express.Router();

router.post("/:post_id", (req, res) => {
  likeController.postLikes(req, res);
});

module.exports = router;
