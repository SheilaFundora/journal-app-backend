const express = require('express');
const router = express.Router();
const {validateToken} = require("../middelwares/validate-jwt");
const {check} = require("express-validator");
const {validateFields} = require("../middelwares/validate-field");
const {getNotes, createNotes, deleteNotes, updateNotes} = require("../controllers/notes");

router.use(validateToken);

/*
Direccion para estas rutas /api/notes
 */

//get note
router.get('/', getNotes);

//create note
router.post('/',
    [
        check('title','The title is requerid').not().isEmpty(),
        check('date','The date is requerid').not().isEmpty(),
        validateFields
    ],
    createNotes);

//delete note
router.delete('/:id', deleteNotes);

//update note
router.put('/:id', updateNotes);

module.exports = router;

