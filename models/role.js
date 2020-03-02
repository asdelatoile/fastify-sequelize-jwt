'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'roles',
    underscored: true
  });
  Role.associate = function (models) {
    // associations can be defined here
    Role.belongsToMany(models.User, { through: 'users_roles', foreignKey: 'role_id', as: 'users' })
  };

  return Role;
};