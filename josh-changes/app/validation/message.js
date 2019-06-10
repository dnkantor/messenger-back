'use strict'

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function schema(message) {
	const schema = {
		message : Joi.string().required(),
		senderId : Joi.objectId().required(),
		receiverId : Joi.objectId().required()
	};

	return Joi.validate(message, schema);
}

module.exports = {
    schema: schema,
}