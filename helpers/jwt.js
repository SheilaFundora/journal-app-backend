
const jwt = require('jsonwebtoken');
const Process = require("process");

//esta funcion queremos que retorne una promesa para q sea ,as facil despues llamarla con el await
const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload =  {uid, name};

        //para firmar el token, resibe el payload, la palabra clave secreta, opciones como en q tiempo
        // quiero q expire
        jwt.sign( payload, Process.env.SECRET_JWT, {
            expiresIn: '2h'
        },(error, token) => { //collback con ek token y un error en el caso d q no se pueda firmar

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