
const jwt = require('jsonwebtoken');
const Process = require("process");

const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload =  {uid, name};

        jwt.sign( payload, Process.env.SECRET_JWT, {
            expiresIn: '2h'
        },(error, token) => {
            if (error){
                console.log(error)
                reject('No se pudo generar el token');
            }

            resolve(token);

        })
    })

}

module.exports = {
    generateJWT
}