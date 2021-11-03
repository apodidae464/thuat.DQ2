/*const config = require('./config');
const sver = require('./host');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

const Model = sver.model;

const app = sver.app;

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.post('/reg', async (request, response) => {
	response.redirect(config.mainMenu);
});*/