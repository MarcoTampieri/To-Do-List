let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('ToDoElement', new Schema ({
    argument: String,
    status: Boolean,
    notes: String,
    priority: Number
}))