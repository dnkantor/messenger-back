const express = require('express');
// const auth = require('../middleware/auth');
const {validateMessage} = require('../validate');
const {Message} = require('../models/message');
const User = require('../models/user');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/', async (req, res) => {
	res.send(await Message.find().sort('-timeSent'));
});

router.post('/', async (req, res) => {
	const {error} = validateMessage(req.body);
	
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

router.get('/:id', async (req, res) => {
	try {
		const message = await Message.findById(req.params.id);

		if (!message) return res.status(404).send("Sorry, that message ID does not exist."); 
		
		res.send(message); 
	} catch (err) {
		res.status(400).send(`Something went wrong: ${err.message}`);
	}
});

// router.put('/:id', async (req, res) => {
// 	const {error} = validateGenre(req.body);
// 	if (error) return res.status(400).send(error.details[0].message);

// 	const genre = await Genre.findByIdAndUpdate(req.params.id, { 
// 		$set: { 
// 			genre : req.body.genre
// 		}
// 	},{ new : true });

// 	if (!genre) return res.status(404).send("Sorry, that genre ID does not exist.");

// 	res.send(genre);
// });

// router.delete('/:id', async (req, res) => {
// 	const genre = await Genre.findByIdAndRemove(req.params.id);

// 	if (!genre) return res.status(404).send("Sorry, that genre ID does not exist.");

// 	res.send(genre);
// });

module.exports = router;
