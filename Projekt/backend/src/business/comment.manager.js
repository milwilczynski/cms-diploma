import models, { sequelize } from '../models/index';

import applicationMessage from '../resources/applicationMessage';
import applicationException from '../exceptions/applicationException';
function create(context) {
  /**
   * Returns all posts across every site
   */
  async function getAllComments() {
    try {
      let comments = await models.comment.findAll({
        include: [
          {
            model: models.post,
            attributes: ['id', 'title'],
          },
        ],
        attributes: {
          exclude: ['postId'],
        },
        order: [['createdAt', 'DESC']],
      });
      if (comments == null || comments.length == 0) {
        return applicationException.new(
          applicationException.NOT_FOUND,
          'No comments found',
        );
      }
      return comments;
    } catch (error) {
      return error;
    }
  }

  async function getCommentsFromPage(siteId) {
    try {
      let comments = await models.comment.findAll({
        include: [
          {
            model: models.post,
            attributes: ['id', 'title', 'siteId'],
            where: {
              siteId: siteId,
            },
          },
        ],
        attributes: {
          exclude: ['postId'],
        },
        order: [['createdAt', 'DESC']],
      });
      if (comments == null || comments.length == 0) {
        return applicationException.new(
          applicationException.NOT_FOUND,
          'No comments found',
        );
      }
      return comments;
    } catch (error) {
      return error;
    }
  }

  async function getCommentsFromPost(postId) {
    try {
      let comments = await models.comment.findAll({
        where: {
          postId: postId,
        },
        include: [
          {
            model: models.post,
            attributes: ['id', 'title'],
          },
        ],
        attributes: {
          exclude: ['postId'],
        },
        order: [['createdAt', 'DESC']],
      });
      if (comments == null || comments.length == 0) {
        return applicationException.new(
          applicationException.NOT_FOUND,
          'No comments found',
        );
      }
      return comments;
    } catch (error) {
      return error;
    }
  }

  async function getComment(id) {
    try {
      let comments = await models.comment.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: models.post,
            attributes: ['id', 'title'],
          },
        ],
        attributes: {
          exclude: ['postId'],
        },
      });
      if (comments == null || comments.length == 0) {
        return applicationException.new(
          applicationException.NOT_FOUND,
          'No comments found',
        );
      }
      return comments;
    } catch (error) {
      return error;
    }
  }

  async function getDashboard() {
    try {
      let comments = await models.comment.findOne({
        order: [['updatedAt', 'DESC']],
        include: [
          {
            model: models.post,
            attributes: ['id', 'title'],
          },
        ],
        attributes: {
          exclude: ['postId'],
        },
      });

      let amount = await models.comment.count();

      if (comments == null || comments.length == 0) {
        return applicationException.new(
          applicationException.NOT_FOUND,
          'No comments found',
        );
      }
      return { comment: comments, amount: amount };
    } catch (error) {
      return error;
    }
  }

  async function addComment(request) {
    const transaction = await sequelize.transaction();
    try {
      await models.comment.create(
        {
          postId: request.body.postId,
          nickname: request.body.nickname,
          title: request.body.title,
          content: request.body.content,
        },
        {
          transaction,
        },
      );
      await transaction.commit();
      return applicationMessage.new(
        applicationMessage.CREATED,
        'Comment has been added',
      );
    } catch (error) {
      await transaction.rollback();
      return error;
    }
  }

  async function deleteComment(id) {
    try {
      const comment = await models.comment.findOne({
        where: {
          id: id,
        },
      });
      if (comment == null) {
        throw applicationException.new(
          applicationException.NOT_FOUND,
          'Comment not found',
        );
      }
      await comment.destroy();
      return applicationMessage.new(
        applicationMessage.OK,
        'Comment has been deleted',
      );
    } catch (error) {
      return error;
    }
  }

  async function editComment(request) {
    try {
      const comment = await models.comment.findOne({
        where: {
          id: request.id,
        },
      });

      if (comment == null) {
        throw applicationException.new(
          applicationException.NOT_FOUND,
          'Comment not found',
        );
      }

      await comment.update({
        title: request.title,
        content: request.content,
      });

      return applicationMessage.new(
        applicationMessage.OK,
        'Comment has been edited',
      );
    } catch (error) {
      return error;
    }
  }
  return {
    getAllComments,
    getCommentsFromPage,
    getCommentsFromPost,
    getDashboard,
    getComment,
    addComment,
    deleteComment,
    editComment,
  };
}

export default {
  create,
};
