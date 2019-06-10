'use strict'

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function schema(login) {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	};

	return Joi.validate(login, schema);
}

module.exports = {
    schema: schema,
}