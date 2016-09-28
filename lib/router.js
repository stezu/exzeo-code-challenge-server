const { HTTPError, errorHandler } = require('express-http-error');

const jsonBodyParser = require('./middleware/jsonBodyParser.js');
const supportTickets = require('./api/supportTickets/index.js');
const supportTicketsValidation = require('./inputValidation/supportTickets/index.js');

function router(app) {

  // Support tickets
  app.post('/v1/supportTickets', jsonBodyParser, supportTicketsValidation.create, supportTickets.create);
  app.get('/v1/supportTickets', supportTickets.readList);
  app.get('/v1/supportTickets/:ticketId', supportTickets.read);
  app.patch('/v1/supportTickets/:ticketId', jsonBodyParser, supportTicketsValidation.update, supportTickets.update);
  app.delete('/v1/supportTickets/:ticketId', supportTickets.del);

  // 404 all other requests
  app.use((req, res, next) => {
    next(HTTPError.notFound());
  });

  app.use(errorHandler);
}

module.exports = router;
