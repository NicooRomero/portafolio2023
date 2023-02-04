const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        unique: true,
        trim: true
    },
    isPinned: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
        defaul: ''
    },
    date: {
        type: Date
    }
});

postSchema.plugin(mongoosePaginate);

postSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

postSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Post', postSchema);