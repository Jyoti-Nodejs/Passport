const db = require("../Models/index");
const Likes = db.likes;

function postLikes(req, res) {
  const post_id = req.params.post_id;

  Likes.create({ post_id: post_id, user_id: req.user.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

module.exports = {
  postLikes,
};
