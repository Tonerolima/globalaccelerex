const express = require('express');
const app = express();
const faker = require('faker');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

let persons = [];

for(let i=0; i<10; i++){
    let obj = {};
    obj.firstname = faker.name.firstName();
    obj.lastname = faker.name.lastName();
    obj.username = obj.firstname + '.' + obj.lastname;
    obj.email = faker.internet.email();
    obj.photo = faker.image.people();
    obj.photoThumb = faker.image.avatar();
    obj.description = faker.random.words();
    obj.nationality = faker.address.country();
    
    persons.push(obj);
}

app.get('/persons', (req, res) => {
    return res.status(200).send({status: true, persons: persons});
})

app.get('/persons/:username', (req, res) => {
    let newPerson;
    persons.forEach((person) => {
        if(req.params.username === person.username){
            newPerson = person;
        }
    })
    
    if(newPerson){
        return res.status(200).send({status: true, person: newPerson});
    } else {
        return res.status(400).send({status: false, message: "Person with username " + req.params.username + " does not exist"});
    }
})


app.post('/persons/:username', (req, res) => {
    if(!req.body.description){
        return res.status(400).send({status: false, message: 'Incomplete parameters passed. Missing fields: description'});
    }

    persons.map((person) => {
        let newPerson = person;
        if(req.params.username === newPerson.username){
           newPerson.description = req.body.description;
           return newPerson;
        }
    })
    res.redirect('/persons/'+req.params.username);
    
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("App is ready");
})