const ToDoElement = require('../app/models/list');

module.exports = (router) => {
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
    });

    //*****GET*****
    router.get('/home/:userId', (req, res) => {
        ToDoElement.find({
            userId: req.params.userId,
        }, (err, ToDoElement) => {
            if (err) throw err;
            console.log("triple check")
            res.send(ToDoElement)
            // console.log(ToDoElement)
            for (i = 0; i < ToDoElement.length; i++) {
                // console.log(ToDoElement[i].notes)
            }
        })
    })

    //*****GET BY ID*****
    router.get('/home/elements/:elementId', (req, res) => {
        ToDoElement.findById({_id:req.params.elementId},
            (err, ToDoElement) => {               
                if (err) throw err;
                res.send(ToDoElement)
            })
            console.log("double check")
    })

    //*****POST*****
    router.post("/home/:userId", (req, res) => {

        const newToDoElement = new ToDoElement({
            userId: req.body.userId,
            argument: req.body.argument,
            status: req.body.status,
            notes: req.body.notes,
            priority: req.body.priority
        })
        newToDoElement.save()
            .then(output => {
                res.send({
                    message: `Task ${newToDoElement.argument} has been saved.`
                });
                console.log(`POST succesful, added ${newToDoElement.argument} to list.`)
            })
            .catch(err => {
                res.send(err);
                console.log(`Task ${newToDoElement.argument} has not been saved.`)
            })
    });

    //*****Put*****
    router.put("/home", (req, res) => {
        ToDoElement.findByIdAndUpdate({
            _id: req.body.elementId
        }, {
            argument: req.body.argument,
            status: req.body.status,
            notes: req.body.notes,
            priority: req.body.priority
        }, {
            new: true
        },(err, ToDoElement) => {
            if (err) throw err;
            res.send(ToDoElement);
        })
    });

    //*****DELETE*****
    router.delete('/home', (req, res) => {

        ToDoElement.deleteOne({
                _id: req.body.elementId
            })
            .then(response => {
                res.send({
                    message: `Deleteing task: ${req.body.elementId}`
                })
                console.log(`Deleteing task: ${req.body.elementId}`)
            })
            .catch(err => res.send(err))
    })
}