var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promoSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    featured: {
        type: Boolean,
        default: false
    },
    price: {
        type: Currency
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// The schema is useless so far. Se need to create a model using it
var Promotions = mongoose.model('Promotion', promoSchema);

// Make this available to our Node applications
module.exports = Promotions;