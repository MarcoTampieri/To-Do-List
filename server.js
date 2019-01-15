const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

const config = require('./config');
const test = require('./routes/test');
const getAll = require('./routes/getAll');
const signUp = require('./routes/signUp');
const signIn = require('./routes/signIn');
const remove = require('./routes/remove');
// const buffer = require('./routes/buffer');

//process.env.PORT || per il basso 
let port = 5000;

mongoose.connect(config.database, {useNewUrlParser: true}, (err) => {
    if (err) throw err;
    console.log("I'm here.")
}); 


app.use(express.static('public'));
app.use('/', express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
    });
//*************
//ROUTES
//*************

let router = express.Router();

test(app);
getAll(router);
signUp(router);
// buffer(router);
signIn(router);
remove(router);

/////////////////

app.use('/', router);

app.use('/api', router);

app.listen(port);
console.log(`Working on: http://localhost${port}`);