var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var logger = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var cors = require('cors');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://pratyay:abcd1234@ds137100.mlab.com:37100/office', function(){
    console.log('Connected Successfully');
});

app.use(require('./routes/api'));


var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('Server Started on '+ port);
});