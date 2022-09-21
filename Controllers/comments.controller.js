const db = require("../Models/index");
const Comments = db.comment;

//create comment
function postComment(req, res) {
  const data = req.body;
  if (!data.posts_id || !data.Comments) {
    return res.status(401).send({
      success: false,
      message: "Wrong comments",
    });
  }
  const commentObj = {
    posts_id: data.posts_id,
    Comments: data.Comments,
  };
  Comments.create(commentObj)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//getAll comment
function getAllComments(req, res) {
  Comments.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//get single comment by Id
function getOneComment(req, res) {
  Comments.findByPk(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//update comment
function updateComment(req, res) {
  const newData = {
    Comments: req.body.Comments,
  };
  Comments.update(newData, { where: { id: req.params.id } })
    .then(() => {
      res.send("Updated comments successfully" + req.params.id);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//delete comment
function deleteComment(req, res) {
  Comments.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send("Deleted comment successfully" + req.params.id);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

module.exports = {
  postComment,
  getAllComments,
  getOneComment,
  updateComment,
  deleteComment,
};
