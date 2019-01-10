let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('Doer', new Schema ({
    name: String,
    email: String,
    password: String,
}));