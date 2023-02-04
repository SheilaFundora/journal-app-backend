const {response} = require('express');
const Note = require("../model/Note");
const jwt = require('jsonwebtoken');
const Process = require("process");

const getNotes =  async (req, res = response) => {

    const payload = jwt.verify(
        req.header('x-token'),
        Process.env.SECRET_JWT
    )

    user_id = payload.uid;
    
    try{
        const note =  await Note.find({user: Object(user_id)});

        if( !note ){
            return res.status(400).json({
                ok: false,
                sms: 'La nota no existe por esa id'
            })
        }

        res.status(201).json({
            ok: true,
            note
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }
}

const createNotes = async (req, res = response) => {
    try{
        const note = new Note( req.body);

        const payload = jwt.verify(
            req.header('x-token'),
            Process.env.SECRET_JWT
        )

        note.user = payload.uid;

        const saveEvent = await note.save();

        res.status(201).json({
            ok: true,
            saveEvent
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }
}

const updateNotes =  async (req, res = response) => {

    const noteId = req.params.id;

    try{
        const note = await Note.findById(noteId)

        if( !note ){
            return res.status(400).json({
                ok: false,
                sms: 'La nota no existe por esa id'
            })
        }

        const payload = jwt.verify(
            req.header('x-token'),
            Process.env.SECRET_JWT
        )

        user_id = payload.uid;


        const newNote = {
            ...req.body,
            user: note.user.toString()
        }

        const noteUpdated = await Note.findByIdAndUpdate( noteId, newNote, {new:true} );


        res.status(201).json({
            ok: true,
            noteUpdated

        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }
}

const deleteNotes =  async (req, res = response) => {

    const noteId = req.params.id;

    try{
        const note =  await Note.findById(noteId);

        if( !note ){
            return res.status(400).json({
                ok: false,
                sms: 'La nota no existe por esa id'
            })
        }

        await Note.findByIdAndDelete(noteId);//resive el id

        res.status(201).json({
            ok: true,
            sms: 'La nota se ha eliminado exitosamente'
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }
}


module.exports = {
    getNotes,
    createNotes,
    updateNotes,
    deleteNotes
}