'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Site extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Site.hasMany(models.post, {
        foreignKey: {
          name: 'siteId',
          allowNull: false,
        },
        onDelete: 'cascade',
      });
    }
  }
  Site.init(
    {
      roleId: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      url: {
        type: DataTypes.STRING,
        unique: true,
      },
      inNav: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'site',
    },
  );
  return Site;
};
