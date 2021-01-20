/* eslint-disable no-unused-vars */
import fileUtility from '../utility/file.utility';
import siteManager from './site.manager';
import userManager from './user.manager';
import postManager from './post.manager';
import commentManager from './comment.manager';
import roleManager from './role.manager';
import settingsManager from './settings.manager';
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
  getPostManager: getter(postManager, request),
  getRoleManager: getter(roleManager, request),
  getCommentManager: getter(commentManager, request),
  getSettingsManager: getter(settingsManager, request),
});

export default createBusinessContainer;
