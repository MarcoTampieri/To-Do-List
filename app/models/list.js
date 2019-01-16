let mongoose = require('mongoose');
let Schema = mongoose.Schema;

module.exports = mongoose.model('ToDoElement', new Schema ({
    userId: String,
    argument: String,
    status: Boolean,
    notes: String,
    priority: String
}))