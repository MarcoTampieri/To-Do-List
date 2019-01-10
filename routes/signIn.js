const Doer = require('../app/models/users');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const config = require('../config');
app.set('secret', config.secret);

module.exports = (router) => {
    router.post('/signIn', (req, res) => {
        Doer.findOne({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, (err, doer) => {
    
            if (err) throw err;
    
            if (doer.name != req.body.name || doer.email != req.body.email) {
                res.json({succes: false, message: `No user found matching entered parameters`});
            } else if (doer) {
                if (doer.password != req.body.password) {
                    res.json({succes: false, message: `Incorrect password`})
                } else {
                    let token = jwt.sign({doer: doer}, app.get('secret'), {expiresIn: '1h'});
    
                    res.json({
                        succes: true,
                        message: `Succesfully created a token`,
                        token: token
                    })
                }
            }
        })
    })
}