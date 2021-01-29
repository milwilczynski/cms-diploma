import business from '../../business/business.container';
import applicationException from '../../exceptions/applicationException';
import authJwt from '../../middleware/auth';
const userEndpoint = (router) => {
  /**
   * Endpoint which shows all users in db.
   */
  router.get(
    '/api/user',
    [authJwt.isAdmin],
    async (request, response, next) => {
      try {
        const result = await business()
          .getUserManager()
          .getAllUsers();
        response.status(200).send(result);
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.get('/api/user/:id', async (request, response, next) => {
    try {
      const result = await business()
        .getUserManager()
        .getUserById(request.params.id);
      result
        ? response.status(200).send(result)
        : response.status(204).send();
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get(
    '/api/user-dashboard',
    async (request, response, next) => {
      try {
        const result = await business()
          .getUserManager()
          .getDashboard(request.params.id);
        result.amount > 0
          ? response.status(200).send(result)
          : response.status(204).send();
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.get(
    '/api/role/:id/user',
    async (request, response, next) => {
      try {
        const result = await business()
          .getUserManager()
          .getUsersByRole(request.params.id);
        result
          ? response.status(200).send(result)
          : response.status(204).send();
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.delete('/api/user/:id', async (request, response, next) => {
    try {
      const result = await business()
        .getUserManager()
        .deleteUserById(request.params.id);
      result
        ? response.status(200).send(result)
        : response.status(204).send();
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * Endpoints which creates user - checking if mail/login is taken
   * then hashes password
   */
  router.put('/api/user', async (request, response, next) => {
    try {
      const result = await business()
        .getUserManager()
        .createNew(request.body);
      result
        ? response.status(200).send(result)
        : response.status(204).send();
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.post('/api/user-edit', async (request, response, next) => {
    try {
      const result = await business()
        .getUserManager()
        .editUser(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * Endpoint which allow to login user onto server
   */
  router.post('/api/user-auth', async (request, response, next) => {
    try {
      const result = await business()
        .getUserManager()
        .authenticate(
          request.body.emailorlogin,
          request.body.password,
        );
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default userEndpoint;
