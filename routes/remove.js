const Doer = require('../app/models/users');


module.exports = (router) => {
    router.delete('/user/manage/:id', (req, res) => {

        Doer.findOne({
            email: req.body.email,
            password: req.body.password
        }, (err, doer) => {

            if (err) throw err;

            if (!doer) {

                res.json({ succes: false,message: `No user found matching entered parameters`});
                
            } else {
                let idd = req.params.id //<-- superfluo, ma tienilo come esempio per sostituzione al parametro qui sotto
 
                Doer.deleteOne({
                    _id: req.params.id
                }, (error, doer) => {

                    if (error) throw error;

                    res.send({
                        succes: true,
                        message: `Delete function succesful. User at ${req.body.email} removed`
                    });
                })
            }
        })
    })
}