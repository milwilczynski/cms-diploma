'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.post, {
        foreignKey: 'postId',
        allowNull: false,
      });
    }
  }
  Comment.init(
    {
      postId: DataTypes.INTEGER,
      nickname: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'comment',
    },
  );
  return Comment;
};
