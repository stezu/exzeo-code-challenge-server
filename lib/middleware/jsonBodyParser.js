const { HTTPError } = require('express-http-error');
const bodyParser = require('body-parser');
const typeIs = require('type-is');
const _ = require('lodash');

function jsonBodyParserMiddleware(req, res, next) {

  if (_.isUndefined(req.headers['content-type'])) {
    next(HTTPError.missingHeader({
      key: 'content-type',
      expected: {
        value: 'application/json'
      }
    }));

    return;
  }

  if (!typeIs(req, 'application/json')) {
    next(HTTPError.invalidHeader({
      key: 'content-type',
      expected: {
        value: 'application/json'
      }
    }));

    return;
  }

  bodyParser({ type: '*/*' })(req, res, (err) => {

    if (err) {
      next(HTTPError.invalidJson());

      return;
    }

    next();
  });
}

module.exports = jsonBodyParserMiddleware;
