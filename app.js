const express = require('express');
const app = express();
const faker = require('faker');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const indexRoutes = require('./routes');

// Mongoose connection
mongoose.connect(process.env.DATABASEURL);

// body-parser middleware for handing form data
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use(indexRoutes);


// SERVER
app.listen(process.env.PORT, process.env.IP, () => {
    console.log("App is ready");
})