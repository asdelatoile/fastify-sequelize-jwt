'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'users',
    underscored: true
  });
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Role, { through: 'users_roles', foreignKey: 'user_id', as: 'roles' })
  };

  User.beforeCreate((user, options) => {
    console.log("beforeCreate", user, options)
    return bcrypt.hash(user.password, 8).then(hashedPw => {
      console.log(hashedPw);
      user.password = hashedPw;
    });
  });


  User.prototype.checkPassword = async function (password) {
    if (!this.password) {
      throw new Error("password not set for this team member");
    }
    const match = await bcrypt.compare(password, this.password);
    return match;
  };

  return User;
};