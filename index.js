require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const mysql = require('mysql');
const path = require('path')

const app = express();
const port = process.env.PORT;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/assets', express.static(__dirname + '/public'));
app.use(require('./router/router'));


hbs.registerPartials(__dirname + "/views/partials/")


app.listen(port, () => {
    console.log(`Usando el puerto : ${port}`);
});