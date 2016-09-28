const { HTTPError } = require('express-http-error');
const _ = require('lodash');

function inputValidation(req, res, next) {

  if (_.isEmpty(req.body)) {
    return next(HTTPError.missingBody());
  }

  if (_.isUndefined(req.body.description)) {
    return next(HTTPError.missingInput({
      key: 'description',
      expected: {
        type: 'string'
      }
    }));
  }

  if (!_.isString(req.body.description)) {
    return next(HTTPError.invalidInput({
      key: 'description',
      expected: {
        type: 'string'
      }
    }));
  }

  if (_.isUndefined(req.body.email)) {
    return next(HTTPError.missingInput({
      key: 'email',
      expected: {
        type: 'string'
      }
    }));
  }

  if (!_.isString(req.body.email)) {
    return next(HTTPError.invalidInput({
      key: 'email',
      expected: {
        type: 'string'
      }
    }));
  }

  if (_.isUndefined(req.body.assignee)) {
    return next(HTTPError.missingInput({
      key: 'assignee',
      expected: {
        type: 'string'
      }
    }));
  }

  if (!_.isString(req.body.assignee)) {
    return next(HTTPError.invalidInput({
      key: 'assignee',
      expected: {
        type: 'string'
      }
    }));
  }

  if (_.isUndefined(req.body.state)) {
    return next(HTTPError.missingInput({
      key: 'state',
      expected: {
        oneOf: ['created', 'processing', 'closed']
      }
    }));
  }

  if (!_.includes(['created', 'processing', 'closed'], req.body.state)) {
    return next(HTTPError.invalidInput({
      key: 'state',
      expected: {
        oneOf: ['created', 'processing', 'closed']
      }
    }));
  }

  return next();
}

module.exports = inputValidation;
