import business from '../../business/business.container';
import applicationException from '../../exceptions/applicationException';
import applicationMessage from '../../resources/applicationMessage';

const roleEndpoint = (router) => {
  router.get('/api/roles', async (request, response, next) => {
    try {
      const result = await business().getRoleManager().getAllRoles();
      result.length > 0
        ? response.status(200).send(result)
        : response.status(204).send();
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get('/api/roles/:id', async (request, response, next) => {
    try {
      const result = await business()
        .getRoleManager()
        .getRoleById(request.params.id);
      result
        ? response.status(200).send(result)
        : response.status(204).send();
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get(
    '/api/roles-dashboard',
    async (request, response, next) => {
      try {
        const result = await business()
          .getRoleManager()
          .getDashboard();
        result.amount > 0
          ? response.status(200).send(result)
          : response.status(204).send();
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );

  router.delete('/api/roles/:id', async (request, response, next) => {
    try {
      const result = await business()
        .getRoleManager()
        .deleteRoleById(request.params.id);

      result
        ? response
            .status(200)
            .send(
              applicationMessage.new(
                applicationMessage.OK,
                'Role has been deleted',
              ),
            )
        : response.status(204).send();
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.put('/api/roles', async (request, response, next) => {
    try {
      const result = await business()
        .getRoleManager()
        .addRole(request);

      if (result.name == 'SequelizeUniqueConstraintError') {
        response.status(409).send(result.parent.detail);
      } else {
        response.status(201).send(result);
      }
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.post(
    '/api/roles/update',
    async (request, response, next) => {
      try {
        const result = await business()
          .getRoleManager()
          .updateRole(request);

        if (result.name == 'SequelizeUniqueConstraintError') {
          response.status(409).send(result.parent.detail);
        } else {
          result
            ? response.status(200).send(result)
            : response.status(204).send();
        }
      } catch (error) {
        applicationException.errorHandler(error, response);
      }
    },
  );
};

export default roleEndpoint;
