const db = require("../Models/index");
const Users = db.user;

//getAll user
function getAllUser(req, res) {
  Users.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//get single user by Id
function getOneUser(req, res) {
  Users.findByPk(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//update user
function updateUser(req, res) {
  const newObj = {
    Name: req.body.Name,
    Email: req.body.Email,
  };
  Users.update(newObj, { where: { Email: req.body.Email } })
    .then(() => {
      res.send("Updated data successfully" + req.body.Email);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//delete user
function deleteUser(req, res) {
  Users.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send("Deleted data successfully" + req.params.id);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

module.exports = {
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
};
