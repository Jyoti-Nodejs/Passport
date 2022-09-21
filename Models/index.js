const Sequelize = require("sequelize");
const sequelize = new Sequelize("nodeapi", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./users")(sequelize, Sequelize);
db.posts = require("./posts")(sequelize, Sequelize);
db.comment = require("./comments")(sequelize, Sequelize);
db.likes = require("./likes")(sequelize, Sequelize);

db.likes.belongsTo(db.user, { foreignKey: "user_id" });
db.user.hasMany(db.posts, { foreignKey: "user_id" });
db.posts.hasMany(db.comment, { foreignKey: "posts_id" });
db.posts.hasMany(db.likes, { foreignKey: "posts_id" });
module.exports = db;
