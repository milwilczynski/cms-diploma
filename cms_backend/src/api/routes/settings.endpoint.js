import business from '../../business/business.container';
import applicationException from '../../exceptions/applicationException';

const settingsEndpoint = (router) => {
  router.get('/api/settings', async (request, response, next) => {
    try {
      const result = await business()
        .getSettingsManager()
        .getConfig();
      if (result.length > 0) {
        response.status(200).send(result[0]);
      } else {
        response.status(204).send({ message: 'Not Found' });
      }
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.post(
    '/api/settings-header',
    async (request, response, next) => {
      try {
        const result = await business()
          .getSettingsManager()
          .updateHeader(request.body);
        if (result.length > 0) {
          response.status(200).send(result);
        } else {
          response.status(204).send({ message: 'Not Found' });
        }
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.post(
    '/api/settings-layout',
    async (request, response, next) => {
      try {
        const result = await business()
          .getSettingsManager()
          .updateLayout(request.body);
        if (result.length > 0) {
          response.status(200).send(result);
        } else {
          response.status(204).send({ message: 'Not Found' });
        }
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.post(
    '/api/settings-colors',
    async (request, response, next) => {
      try {
        const result = await business()
          .getSettingsManager()
          .updateColors(request.body);
        if (result.length > 0) {
          response.status(200).send(result);
        } else {
          response.status(204).send({ message: 'Not Found' });
        }
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );
};

export default settingsEndpoint;
