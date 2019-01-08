const express = require('express');
const app = express();
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');
const User = require('./app/models/users');


let port = process.env.PORT || 5000;

mongoose.connect(config.database, {useNewUrlParser: true}, (err) => {
    if (err) throw err;
    console.log("I'm here.")
});

app.set('secret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(morgan('dev'));

//*************
//ROUTES
//*************

let router = express.Router();

//Test route

app.get('/', (req, res) => {
    res.send(`I'll always be here`)
});

//No ID route

router.get('/allUsers', (req, res) => {
    User.find()
    // .then(output => {
    //     res.json(users)
    // })
    .then(profiles => {
        if(!profiles) {
        errors.noprofile = 'There are no profiles';
        res.status(404).json(errors);
        };
        res.json(profiles)
        
    }
        )
    .catch(err => {
        res.status(404).json('Y a un problème');
        console.log(`An error occured in GET on route "/allUsers`)
    })
});

router.post('/newUser', (req, res) => {
    const newUser = new User();

    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    newUser.save()
    .then(output => {
        res.send({message: `User ${newUser.name} (email: ${newUser.email}) created.`});
    })
    .catch(err => {
        res.send(err);
        console.log(`An error has occured in POST on route "/newUser`)
    })
});

/////////////////

app.use('/', router);

app.listen(port);
console.log(`Working on: http://localhost${port}`);