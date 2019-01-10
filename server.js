const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');
const test = require('./routes/test');
const getAll = require('./routes/getAll');
const signUp = require('./routes/signUp');
const signIn = require('./routes/signIn');
const remove = require('./routes/remove');

//process.env.PORT || per il basso 
let port = 5000;

mongoose.connect(config.database, {useNewUrlParser: true}, (err) => {
    if (err) throw err;
    console.log("I'm here.")
}); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//*************
//ROUTES
//*************

let router = express.Router();

test(app);
getAll(router);
signUp(router);
signIn(router);
remove(router);

/////////////////

app.use('/', router);

app.use('/api', router);

app.listen(port);
console.log(`Working on: http://localhost${port}`);