const db = require("../Models/index");
const multer = require("multer");
const path = require("path");
const { validationResult } = require("express-validator");

const Posts = db.posts;
const User = db.user;
const Like = db.likes;
const Comment = db.comment;

//multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const uploadImg = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .png, .jpg and .jpeg  format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).single("image");

//create posts
async function createPost(req, res) {
  try {
    uploadImg(req, res, async function (err) {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        if (err instanceof multer.MulterError) {
          return res.send(err.message);
        } else if (err) {
          console.log(err);
          return res.send(err.message);
        }

        const { description } = req.body;
        const { filename } = req.file;

        // if (!filename || !description) {
        //   return res.status(401).send({
        //     success: false,
        //     message: "Invalid Posts",
        //   });
        // }

        const postObj = {
          user_id: req.user.id,
          Image: filename,
          Description: description,
        };
        const result = await Posts.create(postObj);
        return res.send(result);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

//getAll posts
function getAllPost(req, res) {
  Posts.findAll({ where: { user_id: req.user.id } })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Posts data loaded successfully", data: result });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//get single posts by Id
function getOnePost(req, res) {
  Posts.findByPk(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

async function getPostAndCommentsAndLikesByToken(req, res) {
  try {
    const result = await User.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: Posts,
          include: [{ model: Comment }, { model: Like }],
        },
      ],
    });
    res.status(500).json({ message: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
//update user
function updatePost(req, res) {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { image, description } = req.body;
  const newObj = {
    Image: image,
    Description: description,
  };
  Posts.update(newObj, { where: { user_id: req.user.id } })
    .then(() => {
      res.send("Updated Posts successfully" + req.user.id);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//delete user
function deletePost(req, res) {
  Posts.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send("Deleted data successfully" + req.params.id);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

module.exports = {
  createPost,
  getAllPost,
  getOnePost,
  getPostAndCommentsAndLikesByToken,
  updatePost,
  deletePost,
};
