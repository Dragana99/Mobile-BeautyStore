const mongoose = require('mongoose');

//mongoose doc schema
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    icon: {
        type: String,
    }
})

//model
exports.Category = mongoose.model('Category', categorySchema);
