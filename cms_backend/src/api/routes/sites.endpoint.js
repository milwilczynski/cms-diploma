import business from '../../business/business.container';
import applicationException from '../../exceptions/applicationException';

const sitesEndpoint = (router) => {

      router.post('/api/sites/htmlcontent', async (request, response, next) => {
        try{
          const result = business().getFileUtility().getHtmlContent(request.body.dom, request.body.file)
          response.status(200).send(result);
        }catch(error){
          applicationException.errorHandler(error, response);
        }
      });

      router.post('/api/sites/htmlcontent/update', async (request, response, next) => {
        try{
          const result = business().getFileUtility().updateHtmlContent(request.body.dom, request.body.content, request.body.file)
          response.status(200).send(result);
        }catch(error){
          applicationException.errorHandler(error, response);
        }
      });

      router.post('/api/sites/add', async (request, response, next) => {
        try{
          const result = business().getFileUtility().addSite(request.body.file, reuqest.body.filename)
          response.status(200).send(result);
        }catch(error){
          applicationException.errorHandler(error, response);
        }
      });
};

export default sitesEndpoint;
