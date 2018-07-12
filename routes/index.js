const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.redirect('/persons');
})


router.get('/persons', (req, res) => {
    let personsPerPage = 5;
    let page = req.query.page || 1;
    User.find().skip((personsPerPage * page) - personsPerPage).limit(personsPerPage).exec((err, users) => {
        if(err){
            console.log(err);
            return res.send('Server error, this is being investigated');
        }
        return res.status(200).send({status: true, pageCount: page, itemCount: users.length, persons: users});
    })
})


router.post('/persons/create', (req, res) => {
    User.create(req.body, (err, user) => {
        if(err){
            return res.status(400).send({status: false, message: err.message});
        }
        res.status(200).send({status: true, person: user});
    })
})


router.get('/persons/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err){
            return res.status(400).send({status: false, message: "Person with id " + req.params.id + " does not exist"});
        }
        return res.status(200).send({status: true, person: user});
    })
})


router.post('/persons/:id', (req, res) => {
    if(!req.body.description){
        return res.status(400).send({status: false, message: 'Incomplete parameters passed. Missing fields: description'});
    }
    User.findByIdAndUpdate(req.params.id, {description: req.body.description}, (err, user) => {
        if(err){
            return res.status(400).send({status: false, message: "Person with id " + req.params.id + " does not exist"});
        }
        res.redirect('/persons/'+req.params.id);
    })
})


module.exports = router;