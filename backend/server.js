const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // 1. Importa cors
const api = require('./src/api');

const port = 3000;
const app = express();

app.use(cors()); // 2. Usa cors ANTES de las rutas
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', api); 

app.listen(port, function () {
    console.log("Server is listening at port:" + port);
});