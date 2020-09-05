'use strict';
module.exports = (sequelize, DataTypes) => { //on utilise sequelize
  const Post = sequelize.define('messages', {
    messageTitle: DataTypes.STRING,
    messageContent: DataTypes.STRING,
    messageImage: DataTypes.STRING,
  },
    {});
  Post.associate = function (models) {
    // association entre post et user
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Post;
};