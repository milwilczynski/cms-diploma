import business from '../../business/business.container';
import applicationException from '../../exceptions/applicationException';
import applicationMessage from '../../resources/applicationMessage';

const postsEndpoint = (router) => {
  router.get('/api/posts', async (request, response, next) => {
    try {
      const result = await business().getPostManager().getAllPosts();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get('/api/posts/:id', async (request, response, next) => {
    try {
      const result = await business()
        .getPostManager()
        .getPostsFromSite(request.params.id);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get(
    '/api/posts/:id/post',
    async (request, response, next) => {
      try {
        const result = await business()
          .getPostManager()
          .getPost(request.params.id);
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.post('/api/posts/add', async (request, response, next) => {
    try {
      const result = await business()
        .getPostManager()
        .addPost(request);
      response.status(201).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get(
    '/api/posts/:id/delete',
    async (request, response, next) => {
      try {
        const result = await business()
          .getPostManager()
          .deletePost(request.params.id);
        applicationMessage.statusHandler(result, response);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.get(
    '/api/postsdashboard',
    async (request, response, next) => {
      try {
        const result = await business()
          .getPostManager()
          .getNewestPostFromEverySite();
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.post('/api/posts/edit', async (request, response, next) => {
    try {
      const result = await business()
        .getPostManager()
        .editPost(request.body);
      applicationMessage.statusHandler(result, response);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default postsEndpoint;
