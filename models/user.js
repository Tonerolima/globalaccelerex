const mongoose = require("mongoose");

// User Schema setup
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    photo: String,
    photoThumb: String,
    description: String,
    nationality: String,
})

module.exports = mongoose.model('User', UserSchema);