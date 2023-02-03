const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {generateJWT} = require("../helpers/jwt");

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    //instancea del modelo UserSchema, le manamos directo el body
    try{
        //validar si el email existe
        let user = await User.findOne( {email} ); //entre {} xq resibe un object

        if (user){
            return res.status(400).json({
                ok: false,
                sms: 'El email ya esta existe'
            })
        }
        user = new User(req.body);

        //encriptar contrasenna
        const salt = bcrypt.genSaltSync();
        //aqui encriptamos la contrasenna llamando a la funcion hashSync q recibe la contrasenna q
        // queremos encriptar y el salt q no es mas q los saltos q queremos q tenga, por defecto viene en 10 mientras
        // mas grande mas segura pero mas leno

        user.password = bcrypt.hashSync( password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            email,
            password,
            token
        })

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }

}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try{
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).json({
                ok: false,
                sms: 'El usuario no existe con ese email',
            })
        }

        //Verificar si la contrasenna q hay en base d datos es igual a la enviada x el UserSchema
        const validPassw = bcrypt.compareSync(password, user.password);

        if ( !validPassw ){
            res.status(400).json({
                ok: false,
                sms: 'Paswword incorrecta',

            })
        }

        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            sms: 'Por favor hable con el administrador'
        })
    }
}

const revalidateToken = async (req, res) => {
    const {uid,name} = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    createUser, loginUser, revalidateToken
}
