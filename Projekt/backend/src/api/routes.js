'use strict';
import postsEndpoint from './routes/posts.endpoint';
import sitesEndpoint from './routes/sites.endpoint';
import userEndpoint from './routes/user.endpoint';
import commentsEndpoint from './routes/comments.endpoint';
import roleEndpoint from './routes/role.endpoint';
import settingsEndpoint from './routes/settings.endpoint';

const routes = (router, config) => {
  userEndpoint(router);
  sitesEndpoint(router);
  postsEndpoint(router);
  commentsEndpoint(router);
  settingsEndpoint(router);
  roleEndpoint(router);
};

export default routes;
