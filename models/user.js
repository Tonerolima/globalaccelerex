const mongoose = require("mongoose");

// User Schema setup
const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {
        type: Number,
        set: n => Math.round(n),
        required: true
    },
    email: String,
    photo: String,
    photoThumb: String,
    description: {type: String, required: true},
    nationality: String,
})

module.exports = mongoose.model('User', UserSchema);