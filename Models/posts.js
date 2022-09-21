module.exports = (sequelize, Sequelize) => {
  const posts = sequelize.define("Posts", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      autoNull: false,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      autoNull: false,
      foreignKey: true,
    },
    Image: {
      type: Sequelize.STRING,
    },
    Description: {
      type: Sequelize.STRING,
    },
  });
  return posts;
};
