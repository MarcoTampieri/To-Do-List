const Doer = require('../app/models/users');

module.exports= (router) => {
    router.get('/allUsers', (req, res) => {
        Doer.find()
        .then(doers => {
            // This thing below causes problems
            // if (!doers) {
            //     res.status(404).json({message: `No users found`});
            // }
            res.json(doers);
            console.log(`GET request executed.`)
        })
    
        .catch(err => {
            res.status(404).json('Y a un problème');
            console.log(`An error occured in GET on route "/allUsers`)
        })
    });
}