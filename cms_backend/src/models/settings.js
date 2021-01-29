'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Settings.init(
    {
      isHeader: DataTypes.BOOLEAN,
      headerColor: DataTypes.STRING,
      menuColor: DataTypes.STRING,
      bodyColor: DataTypes.STRING,
      navbarColor: DataTypes.STRING,
      layout: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'settings',
    },
  );
  return Settings;
};
