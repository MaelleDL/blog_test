// J'appelle express:
const express = require('express');  
const app= express();

// J'ai fait un fichier article avec toutes mes routes dedans, je l'appelle donc:
const artRoutes= require('./routes/article');

// j'ai besoin de mongoose pour gérer mon type de données et communiquer avec ma bdd, je l'appelle:
const mongoose = require('mongoose');

// body parser sert à mettre les données dans le bon format pour la base de données, je l'appelle:
const bodyParser= require('body-parser');

// J'ai besoin de me connecter à ma base de données (je console log pour être bien sûre que je suis connectée):
// visiblement c'est une action qui prend un peu de temps donc c'est pas mal de mettre dans les débuts du code
let monUrl = require ('./config.json')
mongoose.connect(monUrl.url, () => 
console.log('connected to MongoDB!'));

// // Je créer l'application body parser avec le
app.use(bodyParser.urlencoded({ extended: false }));

// J'évite les problèmes de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // Je permet à mon application d'aller chercher des pages statiques dans mon dossier front end
  app.use(express.static('../frontend'));

// Je fais en sorte que mon serveur "écoute sur le port de mon choix" et je le console.log pour savoir quand mon serveur est près
app.listen(3000, () => {
    console.log('j’écoute sur le port 3000 !')});


// j'indique que mon application doit utilises les routes de mon routeur
app.use('/article',artRoutes);