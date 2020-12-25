import business from '../../business/business.container';
import applicationException from '../../exceptions/applicationException';
import utility from "../../utility/utility.container";
import multer from "multer";
import e from 'express';
import applicationMessage from '../../resources/applicationMessage';
const sitesEndpoint = (router) => {

  router.post('/api/sites/htmlcontent', async (request, response, next) => {
    try {
      const result = await business().getSiteManager().getHtmlContent(request.body.dom, request.body.id)
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.post('/api/sites/htmlcontent/update', async (request, response, next) => {
    try {
      const result = await business().getSiteManager().updateHtmlContent(request.body.dom, request.body.content, request.body.file)
      response.status(200).send(result);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.post('/api/sites/add', async (request, response, next) => {
    try {
      var upload = await business().getFileUtility().uploadHtml('html');
      await upload(request, response, async function (file, err) {
        if (request.fileValidationError) {
          return response.send(request.fileValidationError);
        } else if (!request.file) {
          return response.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
          return response.send(err);
        } else if (err) {
          return response.send(err);
        } else if (request.file) {
          const result = await business().getSiteManager().addSite(request, response, next);
          response.status(201).send(result);
        }
      });
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  });

  router.get('/api/sites/:id/delete', async (request, response, next) => {
    try {
      const result = await business().getSiteManager().deleteSite(request.params.id);
      //response.status(200).send(result);
      applicationMessage.statusHandler(result, response);
    } catch (error) {
      applicationException.errorHandler(error, response);
    }
  })

  router.get('/api/sites', async (request, response, next) => {
    const result = await business().getSiteManager().getAllSites();
    response.status(200).send(result);
  })
};

export default sitesEndpoint;