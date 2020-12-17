/* eslint-disable no-unused-vars */
import fileUtility from '../utility/file.utility';

function getContext(request) {
  return { user: request && request.user };
}

function getter(manager, request) {
  return function () {
    return manager.create(getContext(request), this);
  };
}

const createUtilityContainer = (request, config) => ({
  getFileUtility: getter(fileUtility, request),
});

export default createUtilityContainer;
