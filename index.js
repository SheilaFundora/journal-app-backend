const express = require('express');
const {dbconection} = require("./database/config");
require('dotenv').config();
const cors = require('cors');


const app = express();

app.use(cors())

dbconection();

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})

//directorio publico
app.use( express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));






