const mongoose = require('mongoose');
const Scheme = mongoose.Schema

const UserScheme = new Scheme({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    panCard: {
        type: String
    },
    panNameExtension: {
        type: String
    },
    aadhaarCard: {
        type: String
    },
    aadhaarNameExtension: {
        type: String
    }
});

module.exports = User = mongoose.model('users', UserScheme);