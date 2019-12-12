const express = require('express');
const users = express.Router();
const cors = require('cors');
const User = require("../models/Users");

users.use(cors())

users.post('/register', (req, res) => {
    const userData = {
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        password: req.body.user.password,
        userName: req.body.user.userName
    }
    User.findOne({
        userName: req.body.user.userName
    })
        .then(user => {
            if (!user) {
                User.create(userData)
                    .then(user => {
                        res.send(user);
                    })
                    .catch(err => {
                        res.send(err + "error")
                    })
            }
            else {
                res.json({ error: "User already exists" })
            }
        })
        .catch(err => {
            res.send(err);
        })
});

users.post('/login', (req, res) => {
    User.findOne({
        userName: req.body.user.userName
    })
        .then(user => {
            if (user) {
                if (req.body.user.password === user.password) {
                    res.send(user);
                } else {
                    throw ({ error: 'Wrong Password' })
                }
            } else {
                throw ({ error: 'User does not exist' });
            }
        })
        .catch(err => {
            res.send(err)
        })

})
findone = (obj) => {
    return new Promise((resolve, reject) => {
        User.findOne(obj)
            .then((user) => {
                resolve(user);
            })
            .catch((err) => {
                reject(err);
            })
    })

}
users.get('/update/:id', (req, res) => {
    console.log(req.params.id)
    User.findOne({ _id: req.params.id }, function (err, response) {
        if (err) console.error(err);
        res.send(response.panCard)
        // fs.writeFile('testout.pdf', doc.lastName, function(err){
        //     if (err) throw err;
        //     console.log('Sucessfully saved!');
        // });
    });

})

users.post('/updates', (req, res) => {
    const filter = { userName: req.body.user.userName }
    const update = {
        panCard: req.body.user.pan,
        panNameExtension: req.body.user.panNameExtension
    }
    User.findOneAndUpdate(filter, update)
        .then(response => {
       //     res.send(response);
            findone(filter)
                .then(user => {

                    console.log(user);
                    res.send(user);
                })
        })
        .catch(err => {
            res.send(err);
        })
})
module.exports = users;