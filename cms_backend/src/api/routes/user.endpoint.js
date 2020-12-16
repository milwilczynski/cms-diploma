import business from '../../business/business.container';
import applicationException from '../../exceptions/applicationException';

const userEndpoint = (router) => {

  /**
   * Endpoint which shows all users in db.
   */
  router.get('/api/user', async (request, response, next) => {
    try {
      const result = await business().getUserManager().getAllUsers();
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * Endpoints which creates user - checking if mail/login is taken
   * then hashes password
   */
  router.post('/api/user/create', async (request, response, next) => {
    try {
      const result = await business()
        .getUserManager()
        .createNew(request.body);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  /**
   * Endpoint which allow to login user onto server
   */
  router.post('/api/user/auth', async (request, response, next) => {
    try {
      const result = await business()
        .getUserManager()
        .authenticate(request.body.emailorlogin, request.body.password);
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });
};

export default userEndpoint;
