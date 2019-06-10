'use strict';

const source = require('rfr');
const logger = source('josh-changes/app/logger');

/**
 * Logs each request sent to the server at the debug level
 * @param {Object} req - API request object created by express
 * @param {Object} res - API response object created by express
 * @param {Object} next - Contains the rest of the router
 * @return {Route} Calls the next object to be executed by the router
 */
function logRequests(req, res, next) {
  const logString = 'Request Recieved. ' +
  `Protocol = '${req.protocol}'. ` +
  `URL = '${req.originalUrl}'. ` +
  `IP = '${req.ip}'. ` +
  `Body = '${req.body}'.`;

  logger.debug(logString);

  return next();
}

module.exports = logRequests;
