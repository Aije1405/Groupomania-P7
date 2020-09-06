'use strict';
module.exports = (sequelize, DataTypes) => { //appel sequelize
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Post) //association des users et des posts
  };
  return User;
};