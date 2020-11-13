"use strict";
import userEndpoint from "./routes/user.endpoint";

const routes = (router, config) => {
  userEndpoint(router);
};
export default routes;
