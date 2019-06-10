'use strict';

// Import all required npm packages for the server
const express = require('express');

// Import all custome packages the server must use
const source = require('rfr');
const router = source('josh-changes/app/routes');
const config = source('config');
const logger = source('josh-changes/app/logger');

// Initializes the express application
const app = express();

// Default port for the app
const port = config.port || 3000;

// Adds the routes to the server
app.use(router);

// Starts the server
app.listen(port, () => {
  logger.info(`Server is listening on port ${port} in ${config.mode} mode!`);
});
