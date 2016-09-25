const MockReq = require('mock-express-request');
const MockRes = require('mock-express-response');

MockRes.prototype._getString = function () { // eslint-disable-line no-underscore-dangle
  const buf = this._readableState.buffer; // eslint-disable-line no-underscore-dangle

  if (buf instanceof Array) {
    return Buffer.concat(buf).toString();
  }

  // the addition of BufferList makes this necessary
  return buf.join('');
};

function mockReqPair({ request, response }) {
  var req = new MockReq(request);
  var res = new MockRes(response);

  // add circular references
  req.res = res;
  res.req = req;

  // fix defaults
  req.headers['transfer-encoding'] = 'chunked';
  delete req.headers['content-length'];

  return {
    req,
    res
  };
}

module.exports = mockReqPair;
