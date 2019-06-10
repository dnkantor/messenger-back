'use strict';

const winston = require('winston');
const mkdirp = require('mkdirp');

const source = require('rfr');
const config = source('config');

const LOG_DIR = (config.log && config.log.dir) ? config.log.dir : 'logs';
const LOG_LEVEL = (config.log && config.log.level) ? config.log.level : 'info';

mkdirp.sync(LOG_DIR);

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.json(),
  transports: [
    // Writes all logging information at the specified log level
    // and below to the console in a readable format
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    // Duplicates everything written to the console in a file
    new winston.transports.File({
      filename: `${LOG_DIR}/console_copy.log`,
    }),
    // Writes all logging information error and below to a file
    new winston.transports.File({
      filename: `${LOG_DIR}/error.log`,
      level: 'error',
    }),
    // Writes all logging information to a file
    new winston.transports.File({
      filename: `${LOG_DIR}/all.log`,
      level: 'debug',
    }),
  ],
});

module.exports = logger;
