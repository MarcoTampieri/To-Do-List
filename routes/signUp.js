const Doer = require('../app/models/users');

module.exports = (router) => {
    router.post('/signUp', (req, res) => {

        Doer.findOne({
            email: req.body.email
        }, (err, newDoer) => {

            if (err) throw err;

            if (newDoer) {
                res.json({
                    succes: false,
                    message: `An other user has already signed up with this e-mail adress, try an other.`
                });
                console.log(`An other user has already signed up with this e-mail adress, try an other.`)
            } else {
                const newDoer = new Doer({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                newDoer.save()
                    .then(output => {
                        res.send({
                            message: `User ${newDoer.name} (email: ${newDoer.email}) created.`
                        });
                        console.log(`POST succesful, added ${newDoer.name} to users.`)
                    })
                    .catch(err => {
                        res.send(err);
                        console.log(`An error has occured in POST on route "/newUser`)
                    })
            }
        })
    });
}