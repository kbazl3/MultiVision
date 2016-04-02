var express = require('express');
var stylus = require('stylus'); //stylus serves up css files
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'; //environment variable to determine in production mode or development mode.

var app = express();
function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views'); //set the views property to the path where i'm going to hold my views.
app.set('view engine', 'jade'); //set the view engine
app.use(logger('dev'));
app.use(stylus.middleware( //configuring stylus middleware
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

if (env === 'development') {
    mongoose.connect('mongodb://localhost/multivision');
} else {
    mongoose.connect('mongodb://kbarlow:multivision@ds011830.mlab.com:11830/multivision');
}
console.log(env);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('multivision db is open');
});
// var messageSchema = mongoose.Schema({message: String});
// var Message = mongoose.model('Message', messageSchema);
// var mongoMessage;
// Message.findOne().exec(function(err, messageDoc) {
//     mongoMessage = messageDoc.message;
// });


app.get('/partials/:partialPath', function(req, res) {
    res.render("partials/" + req.params.partialPath);
});

app.get('*', function(req, res) { //the * matches all routes.
    res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port, function() {
    console.log("listening on " + port);
});
