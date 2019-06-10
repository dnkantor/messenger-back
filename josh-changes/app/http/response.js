'use strict';

const ResponseCodes = require('./codes');

/** Class representing an API Response. */
class Response {
  /**
   * Create an API Response Object.
   * This object uses the builder pattern for data setting
   */
  constructor() {
    this._status = '';
    this._code = -1;
    this._messages = [];
    this._data = {};
  }

  /**
   * Gets the response status
   * @return {String} Response status
   */
  get status() {
    return this._status;
  }

  /**
   * Gets the response code
   * @return {Number} Response code
   */
  get code() {
    return this._code;
  }

  /**
   * Gets the response messages
   * @return {[String]} Response messages array
   */
  get messages() {
    return this._messages;
  }

  /**
   * Gets the response data
   * @return {Object} Response data
   */
  get data() {
    return this._data;
  }

  /**
   * Sets the response status
   * @param  {String} status - The new response status
   * @return {Response} Response object the status was set for
   */
  setStatus(status) {
    this._status = status;

    return this;
  }

  /**
   * Sets the response code
   * @param  {String} code - The new response code
   * @return {Response} The response object the code was set for
   */
  setCode(code) {
    this._code = code;

    return this;
  }

  /**
   * Sets the response messages
   * @param  {[String]} messages - The new response messages
   * @return {Response} Response object the status was set for
   */
  setMessages([messages]) {
    this._messages = messages;

    return this;
  }

  /**
   * Sets the response data
   * @param  {Object} data - The new response data
   * @return {Response} Response object the status was set for
   */
  setData(data) {
    this._data = data;

    return this;
  }

  /**
   * Creates response object with the status code 200 and status 'Success'
   * Status and code can be overriden but overriding code is not recommended.
   * @return {Response} Response obj with status "Success" and the code 200
   */
  static success() {
    return new Response()
        .setStatus('Success')
        .setCode(ResponseCodes.SUCCESS);
  }

  /**
   * Creates response object with the status code 400 and status 'Bad Request'.
   * Status and code can be overriden but overriding code is not recommended.
   * @return {Response} Response obj with status "Bad Request" and the code 400
   */
  static badRequest() {
    return new Response()
        .setStatus('Bad Request')
        .setCode(ResponseCodes.BAD_REQUEST);
  }

  /**
   * Creates response object with the status code 404 and status 'Not Found'.
   * Status and code can be overriden but overriding code is not recommended.
   * @return {Response} Response obj with status "Not Found" and the code 404
   */
  static notFound() {
    return new Response()
        .setStatus('Not Found')
        .setCode(ResponseCodes.NOT_FOUND);
  }

  /**
   * Creates response object with the status code 500
   * and status 'Internal Server Error'.
   * Status and code can be overriden but overriding code is not recommended.
   * @return {Response} Response obj with status "Internal Server Error"
   * and the code 500
   */
  static internalServerError() {
    return new Response()
        .setStatus('Internal Server Error')
        .setCode(ResponseCodes.INTERNAL_SERVER_ERROR);
  }

  /**
   * Creates response object with the status code 503
   * and status 'Service Unavailable'.
   * Status and code can be overriden but overriding code is not recommended.
   * @return {Response} Response obj with status "Service Unavailable"
   *  and the code 503
   */
  static serviceUnavailible() {
    return new Response()
        .setStatus('Service Unavailable')
        .setCode(ResponseCodes.SERVICE_UNAVAILABLE);
  }

  /**
   * Adds messages to the current array of messages
   * @param  {...String} messages - The messages to be added to the response
   * @return {Response} Response object the status was set for
   */
  addMessages(...messages) {
    if (!this._messages) {
      this._messages = [];
    }

    messages.forEach((message) => {
      this._messages.push(message);
    });

    return this;
  }

  /**
   * Converts the object to a JSON object. This method is needed to remove
   * the _ in the private variables
   * @return {Response} JSON representation of Response object
   */
  toJson() {
    return {
      code: this._code,
      status: this._status,
      messages: this._messages,
      data: this._data,
    };
  }
}

module.exports = Response;
