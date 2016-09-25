const expect = require('chai').expect;

const mockReqPair = require('../mocks/mockReqPair.js');

const jsonBodyParser = require('../../lib/middleware/jsonBodyParser.js');

describe('[JSON Body Parser]', () => {
  const errorHeaders = [
    'image/png',
    'application/xml',
    'application/jsonp'
  ];
  const successHeaders = [
    'application/json',
    'application/json; charset=utf-8',
    'application/json;charset=utf-8',
    'application/json   ;      charset=utf-8'
  ];

  function validateError(err, expected) {
    expect(err).to.be.an.instanceOf(Error);

    // validate name and delete it
    expect(err.name).to.equal('HTTPError');
    delete err.name;

    // validate stack and delete it
    expect(err.stack).to.be.a('string');
    delete err.stack;

    // validate message and delete it
    expect(err.message).to.equal(expected.errorMessage);
    delete err.message;

    expect(err).to.deep.equal(expected);
  }

  it('has the correct public API', () => {

    expect(jsonBodyParser)
      .to.be.a('function')
      .and.to.have.lengthOf(3);
  });

  it('errors if the content-type header is not set', (done) => {
    const reqPair = mockReqPair({
      request: {
        method: 'POST'
      }
    });
    const data = { 'json': 'parsed' };

    delete reqPair.req.headers['content-type'];
    reqPair.req.end(JSON.stringify(data));

    jsonBodyParser(reqPair.req, reqPair.res, (err) => {
      validateError(err, {
        statusCode: 400,
        errorCode: 'missing_header',
        errorMessage: 'The request is missing a required header.',
        errorDetails: {
          key: 'content-type',
          expected: {
            value: 'application/json'
          }
        }
      });
      expect(reqPair.req.body).to.be.an('undefined');

      done();
    });
  });

  errorHeaders.forEach((header) => {

    it(`errors if the content-type header is "${header}"`, (done) => {
      const reqPair = mockReqPair({
        request: {
          method: 'POST'
        }
      });
      const data = { 'dunununununu': 'batman' };

      reqPair.req.headers['content-type'] = header;
      reqPair.req.end(JSON.stringify(data));

      jsonBodyParser(reqPair.req, reqPair.res, (err) => {
        validateError(err, {
          statusCode: 400,
          errorCode: 'invalid_header',
          errorMessage: 'The request specified an invalid header.',
          errorDetails: {
            key: 'content-type',
            expected: {
              value: 'application/json'
            }
          }
        });
        expect(reqPair.req.body).to.be.an('undefined');

        done();
      });
    });
  });

  successHeaders.forEach((header) => {

    it(`succeeds if the content-type header is "${header}"`, (done) => {
      const reqPair = mockReqPair({
        request: {
          method: 'POST'
        }
      });
      const data = { 'banananananana': 'nanananananana' };

      reqPair.req.headers['content-type'] = header;
      reqPair.req.end(JSON.stringify(data));

      jsonBodyParser(reqPair.req, reqPair.res, (err) => {
        expect(err).to.be.an('undefined');
        expect(reqPair.req.body).to.deep.equal(data);

        done();
      });
    });
  });
});
