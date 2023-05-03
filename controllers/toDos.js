const {response} = require('express');

const ToDo = require("../model/ToDo");

const createToDo = async ( req, res = response) => {

    try{
        const toDo = new ToDo(req.body);

        const saveToDo = await toDo.save();

        res.status(201).json({
            ok: true,
            saveToDo
        })

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }

}

const getToDo = async (req, res=response) => {
    try{
        const toDo =  await ToDo.find();

        res.status(201).json({
            ok: true,
            toDo
        })

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }

}

const deleteToDo = async (req,res=response) => {
    const todoId = req.params.id;

    try{
        const toDo =  await ToDo.findByIdAndDelete(todoId);

        res.status(201).json({
            ok: true,
            toDo
        })

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }
}

const updateToDo = async (req, res = response) => {

    const todoId = req.params.id;

    try{
        const todo = await ToDo.findById(todoId)

        if( !todo ){
            return res.status(400).json({
                ok: false,
                sms: 'The task no not exist'
            })
        }

        const newToDo = {
            ...req.body
        }

        const toDopdated = await ToDo.findByIdAndUpdate( todoId, newToDo, {new:true} );

        res.status(201).json({
            ok: true,
            toDopdated

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
    createToDo,
    getToDo,
    deleteToDo,
    updateToDo
}