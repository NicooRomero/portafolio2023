const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    }, 
    order: {
        type: Number
    },
    active: {
        type: Boolean
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

menuSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

menuSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Menu', menuSchema);