import models, { sequelize } from '../models/index';

import applicationMessage from '../resources/applicationMessage';
import applicationException from '../exceptions/applicationException';
function create(context) {
  /**
   * Returns all posts across every site
   */
  async function getAllPosts() {
    try {
      let posts = await models.post.findAll({
        include: [
          {
            model: models.user,
            attributes: ['login', 'id'],
          },
          {
            model: models.site,
            attributes: ['title', 'id'],
          },
        ],
        attributes: {
          exclude: ['userId'],
        },
        order: [
          ['siteId', 'ASC'],
          ['createdAt', 'DESC'],
        ],
      });
      if (posts == null || posts.length == 0) {
        return applicationException.new(
          applicationException.NOT_FOUND,
          'No posts found',
        );
      }
      return posts;
    } catch (error) {
      return error;
    }
  }

  async function getPostsFromSite(siteId) {
    try {
      let posts = await models.post.findAll({
        where: {
          siteId: siteId,
        },
        include: [
          {
            model: models.user,
            attributes: ['login', 'id'],
          },
          {
            model: models.site,
            attributes: ['title', 'id'],
          },
        ],
        attributes: {
          exclude: ['siteId', 'userId'],
        },
      });
      if (posts == null || posts.length == 0) {
        return applicationException.new(
          applicationException.NOT_FOUND,
          'No posts found',
        );
      }
      return posts;
    } catch (error) {
      return error;
    }
  }

  async function getPost(postId) {
    try {
      let posts = await models.post.findOne({
        where: {
          id: postId,
        },
        include: [
          {
            model: models.user,
            attributes: ['login', 'id'],
          },
          {
            model: models.site,
            attributes: ['title', 'id'],
          },
        ],
        attributes: {
          exclude: ['siteId', 'userId'],
        },
      });
      if (posts == null || posts.length == 0) {
        return applicationException.new(
          applicationException.NOT_FOUND,
          'No post found',
        );
      }
      return posts;
    } catch (error) {
      return error;
    }
  }

  async function addPost(request) {
    const transaction = await sequelize.transaction();
    try {
      await models.post.create(
        {
          siteId: request.body.siteId,
          userId: request.body.userId,
          title: request.body.title,
          subtitle: request.body.subtitle,
          content: request.body.content,
        },
        {
          transaction,
        },
      );
      await transaction.commit();
      return applicationMessage.new(
        applicationMessage.CREATED,
        'Post has been added',
      );
    } catch (error) {
      await transaction.rollback();
      return error;
    }
  }

  async function deletePost(id) {
    try {
      const post = await models.post.findOne({
        where: {
          id: id,
        },
      });
      if (post == null) {
        throw applicationException.new(
          applicationException.NOT_FOUND,
          'Post not found',
        );
      }
      await post.destroy();
      return applicationMessage.new(
        applicationMessage.OK,
        'Post has been deleted',
      );
    } catch (error) {
      return error;
    }
  }

  async function editPost(request) {
    try {
      const post = await models.post.findOne({
        where: {
          id: request.id,
        },
      });

      if (post == null) {
        throw applicationException.new(
          applicationException.NOT_FOUND,
          'Post not found',
        );
      }

      await post.update({
        title: request.title,
        subtitle: request.subtitle,
        content: request.content,
      });

      return applicationMessage.new(
        applicationMessage.OK,
        'Post has been edited',
      );
    } catch (error) {
      return error;
    }
  }

  async function getNewestPostFromEverySite() {
    try {
      let posts = await models.post.findAll({
        include: [
          {
            model: models.user,
            attributes: ['login', 'id'],
          },
          {
            model: models.site,
            attributes: ['title', 'id'],
          },
        ],
        attributes: {
          exclude: ['userId'],
        },
        order: [
          ['siteId', 'ASC'],
          ['createdAt', 'DESC'],
        ],
      });
      if (posts == null || posts.length == 0) {
        return applicationException.new(
          applicationException.NOT_FOUND,
          'No posts found',
        );
      }
      var sitesId = [];

      posts.forEach(function (entry) {
        sitesId.push(entry.siteId);
      });
      var i = 0;
      var tempArray = [];
      tempArray.push(await posts[0]);
      posts.forEach(function (entry) {
        i++;
        if (sitesId[i] != sitesId[i + 1]) {
          if (sitesId[i + 1] != null) tempArray.push(posts[i + 1]);
        }
      });

      return tempArray;
    } catch (error) {
      return error;
    }
  }

  return {
    getAllPosts,
    getPostsFromSite,
    getNewestPostFromEverySite,
    getPost,
    addPost,
    deletePost,
    editPost,
  };
}

export default {
  create,
};
