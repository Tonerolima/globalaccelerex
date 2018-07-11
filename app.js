const express = require('express');
const app = express();
const faker = require('faker');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Mongoose connection
mongoose.connect(process.env.DATABASEURL);

// User Schema setup
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    photo: String,
    photoThumb: String,
    description: String,
    nationality: String,
})

const User = mongoose.model('User', UserSchema);

// Set body parser middleware to use the urlencoded option
app.use(bodyParser.urlencoded({extended: true}));


// SEED DB
// for(let i=0; i<10; i++){
//     let obj = {};
//     obj.name = faker.name.findName();
//     obj.email = faker.internet.email();
//     obj.photo = faker.image.people();
//     obj.photoThumb = faker.image.avatar();
//     obj.description = faker.random.words();
//     obj.nationality = faker.address.country();
    
//     User.create(obj, (err, user) => {
//         if(err){
//             console.log(err);
//         } else {
//             console.log(user);
//         }
//     })
// }

// ROUTES
app.get('/', (req, res) => {
    res.redirect('/persons');
})


app.get('/persons', (req, res) => {
    User.find((err, users) => {
        if(err){
            console.log(err);
            return res.send('Server error, this is being investigated');
        }
        return res.status(200).send({status: true, persons: users});
    })
})

app.get('/persons/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err){
            console.log(err);
            return res.status(400).send({status: false, message: "Person with id " + req.params.id + " does not exist"});
        }
        return res.status(200).send({status: true, person: user});
    })
})


app.post('/persons/:id', (req, res) => {
    if(!req.body.description){
        return res.status(400).send({status: false, message: 'Incomplete parameters passed. Missing fields: description'});
    }
    User.findByIdAndUpdate({description: req.body.description}, (err, user) => {
        if(err){
            console.log(err);
            return res.status(400).send({status: false, message: "Person with id " + req.params.id + " does not exist"});
        }
        res.redirect('/persons/'+req.params.id);  
    })
})

// SERVER
app.listen(process.env.PORT, process.env.IP, () => {
    console.log("App is ready");
})