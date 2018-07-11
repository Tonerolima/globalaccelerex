const router = require('express').Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.redirect('/persons');
})


router.get('/persons', (req, res) => {
    User.find((err, users) => {
        if(err){
            console.log(err);
            return res.send('Server error, this is being investigated');
        }
        return res.status(200).send({status: true, persons: users});
    })
})


router.get('/persons/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err){
            console.log(err);
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
            console.log(err);
            return res.status(400).send({status: false, message: "Person with id " + req.params.id + " does not exist"});
        }
        res.redirect('/persons/'+req.params.id);  
    })
})


module.exports = router;