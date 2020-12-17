/* eslint-disable no-unused-vars */
import fileUtility from '../utility/file.utility';
import siteManager from './site.manager';
import userManager from './user.manager';

function getContext(request) {
  return { user: request && request.user };
}

function getter(manager, request) {
  return function () {
    return manager.create(getContext(request), this);
  };
}

const createBusinessContainer = (request, config) => ({
  getUserManager: getter(userManager, request),
  getFileUtility: getter(fileUtility, request),
  getSiteManager: getter(siteManager, request),
});

export default createBusinessContainer;
