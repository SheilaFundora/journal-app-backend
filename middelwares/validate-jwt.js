const jwt = require('jsonwebtoken');
const {response} = require('express');
const Process = require("process");

const validateToken= (req, res = response, next) => {
    // const token = req.header('x-token');
    const token = req.body.token;

    if( !token ){
        return res.status(401).json({
            ok: false,
            sms: 'No hay token'
        })
    }

    try{
        const payload = jwt.verify(
            token,
            Process.env.SECRET_JWT
        )

    }catch(error){
        return res.status(401).json({
            ok: false,
            sms: 'Token no valido'
        })
    }

    next();

}

module.exports = {
    validateToken
}