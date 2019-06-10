'use strict';

const logRequests = require('./logRequests');
const routeNotFound = require('./routeNotFound');

module.exports = {
  logRequests: logRequests,
  routeNotFound: routeNotFound,
};
