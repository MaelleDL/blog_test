const express = require('express');
const app= express();
const artRoutes= require('./routes/article');
const mongoose = require('mongoose');
const bodyParser= require('body-parser');

mongoose.connect('mongodb+srv://MLDL:MlDlPass@cluster0.batv4.mongodb.net/piscinedb?retryWrites=true&w=majority', () => 
console.log('connected to MongoDB!'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });



app.listen(3000, () => {
    console.log('j’écoute sur le port 3000 !')});



app.use('/article',artRoutes);