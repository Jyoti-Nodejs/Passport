const express = require("express");
const bodyParser = require("body-parser");
const postController = require("../Controllers/posts.controller");
const { checkSchema } = require("express-validator");
const postsSchema = require("../Validator/postsInsert.validate");
const postsUpdateSchema = require("../Validator/postUpdate.validate");

const app = express();
app.use(bodyParser.json());
const router = express.Router();

router.post("/", checkSchema(postsSchema), (req, res) => {
  postController.createPost(req, res);
});

router.get("/posts", (req, res) => {
  postController.getAllPost(req, res);
});

// router.get("/:id", (req,res)=>{
//    postController.getOnePost(req,res)
// });

router.get("/", (req, res) => {
  postController.getPostAndCommentsAndLikesByToken(req, res);
});

router.put("/posts", checkSchema(postsUpdateSchema), (req, res) => {
  postController.updatePost(req, res);
});

router.delete("/:id", (req, res) => {
  postController.deletePost(req, res);
});

module.exports = router;
