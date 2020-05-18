const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
    }
});

const Customer = mongoose.model('users', CustomerSchema)

module.exports = Customer;
