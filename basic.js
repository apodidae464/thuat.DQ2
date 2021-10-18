const mongoose = require('mongoose');
const express = require('express');
//init app---
const app = new express();
app.use(express.json());
//---
//connect to mongooes
mongoose.connect('mongodb://localhost/myDataBase')
.then(() => console.log('Connected to mongodb'))
.catch(err => console.error('could not connect to mongodb..', err));
//---
//create db schema
const dbSchema = new mongoose.Schema({
	id: String,
	name: String,
	pass: String
});
///---
//create mongo-collection model
const Model = mongoose.model('userData', dbSchema);
//---
//add obj to collection
async function createObj(objId, objName){
	const obj = new Model({
		id: objId,
		name: objName,
		pass: '123456'
	});
	
	const result = await obj.save();
	console.log(result);
}
//----
//query object----
async function getObj(){
	const allobj = await Model.find();
	console.log(allobj);
}

async function getObj(id){
	const obj = await Model.findById(id);
	console.log(obj);
}
//----
//update object----
async function updateObj(id){
	const obj = await Model.findById(id);
	if(!obj) return;
	obj.pass = 'aed5155';
	const result = await obj.save();
	console.log(obj);
};

async function updateAllDocument(){
	const result = await Model.update({pass: '25252525'});
	console.log(obj);
};
//----
//remove obj
async function removeObj(id)
{
	const result = await Model.deleteOne({ _id: id});
	console.log(result);
}
//----

//createObj();
//updateObj('616dc50836c6739615a4eb88');
//updateAllDocument();
//removeObj('616dc50836c6739615a4eb88');
//---

const arrays = [
	{ id: 1, name: "one" },
	{ id: 2, name: "two" },
	{ id: 3, name: "three" }
];

app.get('/', async (req, res) => {
	const allobj = await Model.find();
	res.send(allobj);
});


app.get('/:id', async (re, res) => {
	const out = await Model.findById(re.params.id);
	if(!out) res.status(404).send('ID NOT FOUND');
	else res.send(out);
});

app.post('/src', (re, res) => {
	if(!re.body.name || re.body.name.length < 3)
	{
		res.status(400).send('NAME HAS REQUIRED AND MINIMUM 3 CHARS');
		return;
	}
	const item = {
		id: arrays.length + 1,
		name: re.body.name
	}
	arrays.push(item);
	res.send(item);
});

app.listen(1412, () => console.log('LISTENING ON PORT 1412...'));
/*createObj(0, 'john');
createObj(1, 'Jerry');
createObj(2, 'Tom');
createObj(3, 'ScoobyDoo');
createObj(4, 'Omaigot');
createObj(5, 'Cutephomaique');
createObj(6, 'Noneedtosay');
createObj(7, 'AfraidOfIs');
createObj(8, 'AlterTheFuture');
createObj(9, 'YouHaveBeenDefeated');
createObj(10, 'NotARandomName');
createObj(11, 'SoDoI');
createObj(12, 'WhyAlwaysMe');
createObj(13, 'DontFollowMe');
createObj(14, 'Fruit');
createObj(15, 'RuleOfFruit');
createObj(16, 'ActionLikeThis');
createObj(17, 'DontDeleteMe');
createObj(18, 'IAmConstant');
createObj(19, 'Poppy');
createObj(20, 'Chronosphere');*/