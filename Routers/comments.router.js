const express= require("express")
const app= express();

const bodyParser= require("body-parser")
app.use(bodyParser.json());

const commentController= require("../Controllers/comments.controller");
const router= express.Router();

router.post("/", (req,res)=>{
    commentController.postComment(req,res)
});

router.get("/", (req,res)=>{
    commentController.getAllComments(req,res)
});

router.get("/:id", (req,res)=>{
   commentController.getOneComment(req,res)
});

router.put("/", (req,res)=>{
    commentController.updateComment(req,res)
});

router.delete("/:id", (req,res)=>{
    commentController.deleteComment(req,res)
});

module.exports= router;