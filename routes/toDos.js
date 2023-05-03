const express = require('express');
const {getToDo, deleteToDo, updateToDo, createToDo} = require("../controllers/toDos");
const router = express.Router();
const {check} = require("express-validator");
const {validateFields} = require("../middelwares/validate-field");


router.post( '/',
    [
        check('name','The name is requerid').not().isEmpty(),
        validateFields
    ],
    createToDo);

router.get( '/', getToDo);
router.delete( '/:id', deleteToDo);
router.put( '/:id', updateToDo);

module.exports = router;
