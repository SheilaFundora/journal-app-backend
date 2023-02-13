const {model, Schema} = require("mongoose");

const NoteSchema = Schema({
    title: {
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
    url: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

NoteSchema.method('toJSON', function (){
    const {_id, ...object} = this.toObject();
    object.id = _id
    return object;
})

module.exports = model('Note', NoteSchema);