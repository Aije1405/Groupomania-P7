'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: DataTypes.STRING,
    attachement: DataTypes.STRING,
  },
    {});
  Post.associate = function (models) {
    models.Post.belongsTo(models.User, {
      foreignKey: { //application clé étrangère posée sur la table
        allowNull: false
      }
    });
  };
  return Post;
};