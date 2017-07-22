var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    abbr: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// The schema is useless so far. Se need to create a model using it
var Leaders = mongoose.model('Leader', leaderSchema);

// Make this available to our Node applications
module.exports = Leaders;