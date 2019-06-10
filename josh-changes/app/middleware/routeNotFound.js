'use strict';

const source = require('rfr');
const logger = source('josh-changes/logger');
const Response = source('josh-changes/app/http').Response;

/**
 * Returns a customized response when a route is not found
 * @param {Object} req - API request object created by express
 * @param {Object} res - API response object created by express
 * @param {Object} next - Contains the rest of the router
 * @return {Route} Calls the next object to be executed by the router
 */
function routeNotFound(req, res, next) {
  logger.error(`Route ${req.originalUrl} does not exist`);
  const response = Response.notFound()
      .addMessages('Route not found');

  return res.status(response.code).send(response.toJson());
}

module.exports = routeNotFound;
