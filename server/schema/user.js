/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.CHAR(50),
      allowNull: false,
      defaultValue: ''
    },
    user_password: {
      type: DataTypes.CHAR(128),
      allowNull: false,
      defaultValue: ''
    },
    user_profession: {
      type: DataTypes.CHAR(128),
      allowNull: true,
      defaultValue: ''
    }
  }, {
    tableName: 'user'
  });
};
