const mongoose = require('mongoose');
// const {userSchema} = require('./user');

const messageSchema = mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	timeSent: {
		type: Date,
		required: true,
		default: Date.now,
	},
	sender: {
		type: new mongoose.Schema({
			name: {
				type: String,
				required: true,
				minlength: 5,
				maxlength: 50
			}
		}), 
		required: true,
	},
	receiver: {
		type: new mongoose.Schema({
			name: {
				type: String,
				required: true,
				minlength: 5,
				maxlength: 50
			}
		}), 
		required: true,
	},
});

const Message = mongoose.model('Message', messageSchema);

module.exports.Message = Message;
module.exports.messageSchema = messageSchema;