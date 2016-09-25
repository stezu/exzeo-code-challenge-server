const http = require('http');

const config = require('config');
const express = require('express');

const router = require('./router.js');

// Create the express instance
const app = express();

app.server = http.createServer(app);

// App Routes
router(app);

// Listen for requests
app.server.listen(config.server.port, () => {
  process.stdout.write(`Web server running on port ${config.server.port}`);
});

module.exports = app;
