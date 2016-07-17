var express = require('express');
var ejs = require('ejs');
//var todoController = require('./controllers/todoController');

var app = express();
var request = require('request');


//setup TEMPLATE ENGIN
app.set('view engine', 'ejs');

// Staticsche dataen
app.use(express.static('./public'));



// höre aif PORT
//app.listen(3000);
var port = 3000;
var times = 0;
var timesS = 0;
var timesQ = 0;
var timesP = 0;
var tick = 0;

io = require('socket.io')({
}).listen(app.listen(port));
console.log("Listening on port " + port);

//console.log('WEB UP auf 3000');
io.sockets.on('connection', function (socket) {
    socket.on('switchDayNight', function () {	
		times++;
		console.log(times);
		socket.emit('switchTime', {times:times});
		socket.broadcast.emit('switchTime', {times:times});
    });
	 socket.on('switchSAD', function () {	
		timesS++;
		console.log("SAD" + timesS);
		socket.emit('switchToSAD', {timesS:timesS});
		socket.broadcast.emit('switchToSAD', {timesS:timesS});
    });
	socket.on('switchQ', function () {	
		timesQ++;
		console.log("Q" + timesQ);
		socket.emit('switchToQ', {timesQ:timesQ});
		socket.broadcast.emit('switchToQ', {timesQ:timesQ});
    });
	if(tick != 0 ){
		tick = 0;
		socket.emit('RELOAD');
		socket.broadcast.emit('RELOAD');
	};
	
});
//befeure Controller
//todoController(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://obs:obs@ds053972.mlab.com:53972/dataobs');
// Schemata für datenbank

var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);


var urlencoderParser = bodyParser.urlencoded({extended: false});


	app.get('/todo', function(req, res){
		Todo.find({}, function(err, data){
			if (err) throw err;
			res.render('todo', {todos:data, times:times, timesS:timesS, timesQ:timesQ});
			
		});
		
		
	});
	
	app.post('/todo', urlencoderParser, function(req, res){
		var newTodo = Todo(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
			tick++;
		})
			
		
	});
	
	app.delete('/todo/:item', function(req, res){
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
			if (err) throw err;
			res.json(data);
			tick++;
		});
		
		
	});
