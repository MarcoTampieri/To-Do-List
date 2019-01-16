const ToDoElement = require('../app/models/list');

module.exports = (router) => {

    router.get('/home/:userId?', (req, res) => {
        ToDoElement.find({
            userId: req.params.userId,
        }, (err, ToDoElement) => {
            if (err) throw err;
            
            res.send(ToDoElement)
            for(i = 0; i < ToDoElement.length; i++) {
                console.log(ToDoElement[i].notes)
            }
            
        })
    })

    // router.get('/home', function(req, res) {
    //     ToDoElement.find({}, function(error, io) {
    //     res.json(io);
    //     console.log(io[0])
    //     for(let i = 0; i < io.length; i++){
    //    console.log(io[i])
    //     }
        
    //     });
    //     });


    router.post("/home", (req, res) => {

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
                        console.log(`POST succesful, added ${newToDoElement.name} to users.`)
                    })
                    .catch(err => {
                        res.send(err);
                        console.log(`Task ${newToDoElement.argument} has not  saved.`)
                    })
    });


    // router.delete("/users", (req, res) => {
    //     let email = req.body.email;
    //     console.log(email);
    //     jsonfile.readFile(file_path, function (err, content) {

    //         for (var i = content.length - 1; i >= 0; i--) {
    //             if (content[i].email === email) {
    //                 console.log("removing " + content[i].email + "from DB");
    //                 content.splice(i, 1);
    //             }
    //         }

    //         jsonfile.writeFile(file_path, content, function (err) {
    //             console.log(err);
    //         });
    //         res.sendStatus(200);
    //     });
    // });


    // router.put("/user", (req, res) => {
    //     let user;
    //     let username = req.body.username;
    //     let email = req.query.email;
    //     let email2 = req.body.email;
    //     console.log(email)
    //     jsonfile.readFile(file_path, function (err, content) {
    //         for (var i = content.length - 1; i >= 0; i--) {
    //             if (content[i].email === email) {
    //                 console.log("updated user " + email + " has now username : " + username);
    //                 user = content[i];
    //                 user.username = username;
    //                 user.email2 = email;

    //             }
    //         }

    //         jsonfile.writeFile(file_path, content, function (err) {
    //             console.log(err);
    //         });
    //     });
    //     res.send(200);
    // });


}