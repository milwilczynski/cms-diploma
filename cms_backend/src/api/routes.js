"use strict";
import sitesEndpoint from "./routes/sites.endpoint";
import userEndpoint from "./routes/user.endpoint";

const routes = (router, config) => {
  userEndpoint(router);
  sitesEndpoint(router);
};

export default routes;
