const express = require('express');
const router = express.Router();  //configurando router
//importando el controlador crearUsuario
const {createUser, loginUser, revalidateToken} = require("../controllers/auth");
//el check es el middelware, q se va a encargar d validar un campo en particular
const {check} = require("express-validator");
const {validateFields} = require("../middelwares/validate-field");
const {validateToken} = require("../middelwares/validate-jwt");


/*
Direccion para estas rutas /api/auth
 */


router.post(
    '/new',
    [

        check('name','The name is requerid').not().isEmpty(),
        check('email','The email is requerid').isEmail(),
        check('password','The password have to have 6 caracteres ').isLength({min:6}),
        validateFields
    ],
    createUser);

router.post(
    '/',
    [
        check('email','The email is requerid').isEmail(),
        check('password','The password have to have 6 caracteres ').isLength({min:6}),
        validateFields
    ],
    loginUser);

router.get( '/renew', validateToken, revalidateToken);

module.exports = router;
