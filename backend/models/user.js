'use strict';
module.exports = (sequelize, DataTypes) => { //on uttilise sequelize
  const User = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    position: DataTypes.STRING,
    department: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // association entre user et post
    models.User.hasMany(models.Post)
  };
  return User;
};