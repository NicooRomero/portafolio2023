const mongoose = require('mongoose');

const cursoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    image: {
        type: String,
        defaul: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

cursoSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cursoSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Curso', cursoSchema);