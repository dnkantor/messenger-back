const express = require('express');
const bcrypt = require('bcrypt');
const {validateLogin} = require('../validate');
const User = require('../models/user');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/', async (req, res) => {
	const {error} = validateLogin(req.body)

	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email : req.body.email });
	if (!user) return res.status(400).send('Invalid username or password.');

	let checkPassword = await bcrypt.compare(req.body.password, user.password);
	if (!checkPassword) return res.status(400).send('Invalid username or password.');

	const token = user.generateAuthToken();

	res.header('x-auth-token', token).sendStatus(200).send();
});

module.exports = router;
