const config = require('./config');
const open = require('open');
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myDataBase')
.then(() => console.log('Connected to mongodb'))
.catch(err => console.error('could not connect to mongodb..', err));

const dbSchema = new mongoose.Schema({
	id: String,
	name: {type: String, required: true, minlength: 6, maxlength: 15},
	pass: {type: String, required: true, minlength: 6, maxlength: 15}
});

const MGModel = mongoose.model('userData', dbSchema);

const appExpress = express();
appExpress.listen(config.localHost, () => console.log('LISTENING ON PORT ', config.localHost));

const lgpath = 'http://localhost:' + config.localHost + '/login';
open(lgpath);

exports.app = appExpress;
exports.model = MGModel;
