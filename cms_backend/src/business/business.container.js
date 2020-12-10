/* eslint-disable no-unused-vars */
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
});

export default createBusinessContainer;
