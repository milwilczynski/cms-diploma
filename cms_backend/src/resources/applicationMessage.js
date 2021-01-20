'use strict';

function ApplicationMessage(status, message) {
  this.status = status;
  this.message = message;
}

export default {
  OK: { message: 'OK', code: 200 },
  CREATED: { message: 'CREATED', code: 201 },
  NO_CONTENT: { message: 'NO_CONTENT', code: 204 },
  new: function (status, message) {
    return new ApplicationMessage(status, message);
  },
  statusHandler: function (status, response) {
    if (status instanceof ApplicationMessage) {
      response.status(status.status.code).send(status);
    } else {
      response.sendStatus(200);
    }
  },
};
