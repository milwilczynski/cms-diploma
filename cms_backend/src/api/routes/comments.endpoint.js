import business from '../../business/business.container';
import applicationException from '../../exceptions/applicationException';
import applicationMessage from '../../resources/applicationMessage';

const commentsEndpoint = (router) => {
  router.get('/api/comments', async (request, response, next) => {
    try {
      const result = await business()
        .getCommentManager()
        .getAllComments();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get('/api/comments/:id', async (request, response, next) => {
    try {
      const result = await business()
        .getCommentManager()
        .getCommentsFromPage(request.params.id);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get(
    '/api/comments/posts/:id',
    async (request, response, next) => {
      try {
        const result = await business()
          .getCommentManager()
          .getCommentsFromPost(request.params.id);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.get(
    '/api/comments/:id/comment',
    async (request, response, next) => {
      try {
        const result = await business()
          .getCommentManager()
          .getComment(request.params.id);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.post(
    '/api/comments/add',
    async (request, response, next) => {
      try {
        const result = await business()
          .getCommentManager()
          .addComment(request);
        response.status(201).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.get(
    '/api/comments/:id/delete',
    async (request, response, next) => {
      try {
        const result = await business()
          .getCommentManager()
          .deleteComment(request.params.id);
        applicationMessage.statusHandler(result, response);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.post(
    '/api/comments/edit',
    async (request, response, next) => {
      try {
        const result = await business()
          .getCommentManager()
          .editComment(request.body);
        applicationMessage.statusHandler(result, response);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );
};

export default commentsEndpoint;
