'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.site, {
        foreignKey: {
          name: 'siteId',
          allowNull: false,
        },
      });
      Post.belongsTo(models.user, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      });
      Post.hasMany(models.comment, {
        foreignKey: {
          name: 'postId',
          allowNull: false,
          hooks: true,
        },
        onDelete: 'cascade',
      });
    }
  }
  Post.init(
    {
      siteId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      subtitle: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'post',
    },
  );
  return Post;
};
