const {model, Schema} = require("mongoose");

const ToDoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true
    },
})

module.exports = model('ToDo', ToDoSchema);