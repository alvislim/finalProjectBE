const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDataSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const UserData = mongoose.model('UserData', UserDataSchema)

module.exports = UserData;