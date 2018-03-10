/* jshint indent: 2 */

export default function(sequelize, DataTypes) {
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
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: ''
    },
    avatar_url: {
      type: DataTypes.CHAR(255),
      allowNull: true,
      defaultValue: ''
    },
    user_hobby: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: ''
    },
    user_sex: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: ''
    }
  }, {
    tableName: 'user'
  });
};
