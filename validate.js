const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

function validateMessage(message) {
	const schema = {
		message : Joi.string().required(),
		senderId : Joi.objectId().required(),
		receiverId : Joi.objectId().required()
	};

	return Joi.validate(message, schema);
}

function validateUser(user) {
	const schema = {
		name : Joi.string().min(5).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	};

	return Joi.validate(user, schema);
}

function validateLogin(login) {
	const schema = {
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required()
	};

	return Joi.validate(login, schema);
}

exports.validateMessage = validateMessage;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
