const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    repo: {
        type: String
    },
    url: {
        type: String
    },
    git: {
        type: String
    },
    img: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

portfolioSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

portfolioSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);