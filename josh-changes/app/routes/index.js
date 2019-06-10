'use strict';

// Import express and create a new router
const express = require('express');

const source = require('rfr');
const logger = source('josh-changes/logger');

const middlewares = source('josh-changes/app/middleware');

const Response = source('josh-changes/app/http').Response;

// Disabling since eslint does not like that Router starts with a capital
// eslint-disable-next-line new-cap
const router = express.Router();

// Adds the middlware to log all api requests
router.use(middlewares.logRequests);

// Import the api routes and mount it to the path "/api"
const apiRoutes = require('./api.js');
router.use('/api', apiRoutes);

// Creates a ready route so api consumers know if the server is ready
router.route('/ready')
    .get((req, res) => {
      logger.debug('/ready endpoints was reached');

      const response = Response.success()
          .addMessages('Endpoint is ready');

      res.status(response.code).send(response.toJson());
    });

// Returns a custom 404 response when a route is not found
router.use(middlewares.routeNotFound);

// Export the router with all mounted paths
module.exports = router;


