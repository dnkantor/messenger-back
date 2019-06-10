'use strict'

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function schema(user) {
	const schema = {
		name : Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255)
	};

	return Joi.validate(user, schema);
}

module.exports = {
    schema: schema,
}