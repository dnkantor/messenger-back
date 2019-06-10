'use strict';

// Import express and create a new router
const express = require('express');
const _ = require('lodash');

const source = require('rfr');
const logger = source('josh-changes/app/logger');

const Response = source('josh-changes/app/http').Response;
const Validation = source('josh-changes/app/validation')

// Auth
const bcrypt = require('bcrypt');
const User = source('josh-changes/app/models/user');

// Messages
const {Message} = require('josh-changes/app/models/message');
const User = require('josh-changes/app/models/user');

// Users
const User = require('josh-changes/app/models/user');
const auth = require('josh-changes/app/middleware/auth');


// Disabling since eslint does not like that Router starts with a capital
// eslint-disable-next-line new-cap
const router = express.Router();

// Creates a test route to show how a route can be added to the server
router.route('/test')
    .get((req, res) => {
      logger.debug('/test api endpointwas reached');

      const response = Response.success()
          .addMessages('Endpoint was called successfully');

      res.status(response.code).send(response.toJson());
    });

// Auth
router.post('/auth', async (req, res) => {
	const {error} = Validation.user.schema(req.body)

	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email : req.body.email });
	if (!user) return res.status(400).send('Invalid username or password.');

	let checkPassword = await bcrypt.compare(req.body.password, user.password);
	if (!checkPassword) return res.status(400).send('Invalid username or password.');

	const token = user.generateAuthToken();

	res.header('x-auth-token', token).sendStatus(200).send();
});

// Messages
router.get('/messages', async (req, res) => {
	res.send(await Message.find().sort('-timeSent'));
});

router.post('/messages', async (req, res) => {
	const {error} = Validation.message.schema(req.body);
	
	if (error) return res.status(400).send(error.details[0].message);

	const sender = await User.findById(req.body.senderId);
	if (!sender) return res.status(400).send("That senderId does not exist.");

	const receiver = await User.findById(req.body.receiverId);
	if (!receiver) return res.status(400).send("That receiver Id does not exist.");

	const newMessage = new Message ({
		message : req.body.message,
		sender : {
			_id : sender._id,
			name : sender.name,
		}, 
		receiver : {
			_id : receiver._id,
			name : receiver.name,
		}
	});

	const result = await newMessage.save();
	res.send(result);
});

router.get('/messages/:id', async (req, res) => {
	try {
		const message = await Message.findById(req.params.id);

		if (!message) return res.status(404).send("Sorry, that message ID does not exist."); 
		
		res.send(message); 
	} catch (err) {
		res.status(400).send(`Something went wrong: ${err.message}`);
	}
});

// Users
router.get('/users', async (req, res) => {
	res.send(await User.find().sort('name'));
});

router.post('/users', async (req, res) => {
	const {error} = Validation.user.schema(req.body)

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

router.get('/users/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).send("Sorry, that user ID does not exist."); 
  
  res.send(user); 
});

router.get('/users/:email', async (req, res) => {
		let user = await User.find({'email': req.params.email});

		if (!user) return res.status(404).send("Sorry, that user email does not exist.");

		res.send(_.pick(user[0], ['_id']));
});

router.get('/users/:id', async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) return res.status(404).send("Sorry, that user ID does not exist."); 
		
		res.send(user); 
	} catch (err) {
		res.status(400).send(`Something went wrong: ${err.message}`);
	}
});

router.delete('/users/:id', async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);

	if (!user) return res.status(404).send("Sorry, that user ID does not exist.");

	res.send(user);
});

router.put('/users/update', auth, async (req, res) => {
	console.log(req.body);
	const {error} = Validation.user.schema(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findByIdAndUpdate(req.user._id, { 
		$set: { 
			name : req.body.name,
			email : req.body.email
		}
	},{ new : true });

	if (!user) return res.status(404).send("Sorry, that user ID does not exist.");

	res.send(user);
});


// Export the router with all mounted paths
module.exports = router;
