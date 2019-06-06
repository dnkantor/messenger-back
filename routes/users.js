const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {validateUser} = require('../validate');
const User = require('../models/user');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
		const user = await User.findById(req.user._id);

		if (!user) return res.status(404).send("Sorry, that user ID does not exist."); 
		
		res.send(user); 
});

router.get('/', async (req, res) => {
	res.send(await User.find().sort('name'));
});

router.post('/', async (req, res) => {
	const {error} = validateUser(req.body)

	if (error) return res.status(400).send(error.details[0].message);

	let newUser = await User.findOne({ email : req.body.email });
	if (newUser) return res.status(400).send('User is already registered.');

	newUser = new User (_.pick(req.body, ['name', 'email', 'password']));

	const salt = await bcrypt.genSalt(10);
	newUser.password = await bcrypt.hash(newUser.password, salt);
	
	const result = await newUser.save();

	const token = newUser.generateAuthToken();
	res.header('x-auth-token', token).send(_.pick(result, ['_id', 'name', 'email']));
});

router.get('/:email', async (req, res) => {
		let user = await User.find({'email': req.params.email});

		if (!user) return res.status(404).send("Sorry, that user email does not exist.");

		res.send(_.pick(user[0], ['_id']));
});

router.get('/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) return res.status(404).send("Sorry, that user ID does not exist."); 
		
		res.send(user); 
	} catch (err) {
		res.status(400).send(`Something went wrong: ${err.message}`);
	}
});

router.put('/:id', async (req, res) => {
	const {error} = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findByIdAndUpdate(req.params.id, { 
		$set: { 
			name : req.body.name,
			email : req.body.email,
			password : req.body.password
		}
	},{ new : true });

	if (!user) return res.status(404).send("Sorry, that user ID does not exist.");

	res.send(user);
});

router.delete('/:id', async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);

	if (!user) return res.status(404).send("Sorry, that user ID does not exist.");

	res.send(user);
});

module.exports = router;
