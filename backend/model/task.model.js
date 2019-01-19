const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = new Schema({
    date: {
        type: String,
        unique: false,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Task', Task);