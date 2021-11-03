const config = require('./config');
const sver = require('./host');
const func = require('./function');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
let alert = require('alert'); 

//const mongoose = require('mongoose');

/*mongoose.connect('mongodb://localhost/myDataBase')
.then(() => console.log('Connected to mongodb'))
.catch(err => console.error('could not connect to mongodb..', err));

const dbSchema = new mongoose.Schema({
	id: String,
	name: String,
	pass: String
});*/

const Model = sver.model;

const app = sver.app;

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get(config.mainMenu, async (req, res) => 
{
	res.send("main menu....");
});

app.get(config.login, (req, res) => 
{
	res.sendFile(path.join(config.htmlPath + '/login.html'));
});

app.get(config.regis, (req, res) => 
{
	res.sendFile(path.join(config.htmlPath + '/register.html'));
});

app.get(config.home, (req, res) => 
{
	res.send('welcome back....');
});



app.post('/auth', async (request, response) => {
	var username = request.body.username;
	var password = request.body.password;
	if(!username && !password)
	{
		response.send('Incorrect Username and/or Password!');
	}
	const isUserNameCorrect = await Model.findOne({name: username});
	const isPassCorrect = await Model.findOne({pass: password});

	if(username && password && isUserNameCorrect && isPassCorrect)
	{
		response.redirect(config.home);
	}
	else 
	{
		response.send('Incorrect Username and/or Password!');
	}
});

app.post('/regis', (request, response) => {
	response.redirect(config.regis);
});

app.post('/reg', async (request, response) => {
	var username = request.body.username;
	var password = request.body.password;
	if(!username || !password || request.body.username.length < 6 || request.body.password.length < 6)
	{
		await alert('Incorrect Username and/or Password! Username must equals or more than 6 chars');
		await func.sleep(3000);
		response.redirect(config.regis);
	}  else {
		const isUserNameCorrect = await Model.findOne({name: username});
		
		if (!isUserNameCorrect) {
			const obj = new Model({
				name: username,
				pass: password
			});
		
			const result = await obj.save();
			console.log(result);
			await alert("Done!!");
			response.redirect(config.login);
		} 
		else 
		{
			await alert("Username has been existed");
			await func.sleep(3000);
			response.redirect(config.regis);
		}
	}
});

