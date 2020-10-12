const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    created: {
        type: Date,
        default: Date.now
       },
    updated: Date,
       
});

module.exports = User = mongoose.model('user', UserSchema);