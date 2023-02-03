const {model, Schema} = require("mongoose");

const EventSchema = Schema({
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
    url_img: {
        type: String,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

//aqui podemos configurar ciertas cosas en los modelos d la bd
//x defecto cuando se crea una tabla se pone _id, y queremos cambiar esto x id
EventSchema.method('toJSON', function (){
    const {_id, ...object} = this.toObject();//en this.toObject tenemos todoo, sacamos el id, y el resto lo dejamos como esta
    object.id = _id
    return object;
})

module.exports = model('Event', EventSchema);