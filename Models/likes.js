module.exports = (sequelize, Sequelize) => {
  const likes = sequelize.define("Likes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      autoNull: false,
      primaryKey: true,
    },
  });
  return likes;
};
