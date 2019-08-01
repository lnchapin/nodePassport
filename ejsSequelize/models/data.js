'use strict';
module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define('Data', {
    post: DataTypes.TEXT
  }, {});
  Data.associate = function(models) {
    // associations can be defined here
    Data.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
  };
  return Data;
};
