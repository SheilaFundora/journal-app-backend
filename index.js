const express = require('express');

const {dbconection} = require("./database/config");
require('dotenv').config();

const app = express();

dbconection();

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})


app.use( express.static('public'));

app.use(express.json())

//Rutas
app.use('/api/todo',require('./routes/toDos'));

