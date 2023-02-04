const mongoose = require('mongoose');

const categoriaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }

});

categoriaSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categoriaSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Categoria', categoriaSchema);