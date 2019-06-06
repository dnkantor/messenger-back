const express = require('express');
const mongoose = require('mongoose');
const messages = require('./routes/messages');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');
const cookieParser = require('cookie-parser');
const app = express();

if (!config.get('jwtPrivateKey')) {
	console.error('jwtPrivateKey is not defined');
	process.exit(1);
}

app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost/messenger') 
	.then(() => console.log('Connected to Messenger Database...'))
	.catch(err => console.log('Error connecting to database', err.message));

app.use('/api/messages', messages);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Running on localhost:${port}`);	
});
