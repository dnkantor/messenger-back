'use strict';

// This module contains common HTTP response codes for use in API responses
const ResponseCodes = {
  // 2xx Codes: Successful Responses
  SUCCESS: 200,

  // 4xx Codes: Client Errors
  BAD_REQUEST: 400,
  NOT_FOUND: 404,

  // 5xx Codes: Server Errors
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

Object.freeze(ResponseCodes);

module.exports = ResponseCodes;
