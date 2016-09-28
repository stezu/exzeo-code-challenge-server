const MockReq = require('mock-express-request');
const MockRes = require('mock-express-response');

MockRes.prototype._getString = () => { // eslint-disable-line no-underscore-dangle
  const buf = this._readableState.buffer; // eslint-disable-line no-underscore-dangle, no-invalid-this

  if (buf instanceof Array) {
    return Buffer.concat(buf).toString();
  }

  // the addition of BufferList makes this necessary
  return buf.join('');
};

function mockReqPair({ request, response }) {
  const req = new MockReq(request);
  const res = new MockRes(response);

  // add circular references
  req.res = res;
  res.req = req;

  // fix defaults
  req.headers['transfer-encoding'] = 'chunked';
  Reflect.deleteProperty(req.headers, 'content-length');

  return {
    req,
    res
  };
}

module.exports = mockReqPair;
