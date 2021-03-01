// j'appelle express
const express = require("express");
const router = express.Router();

//j'indique que mon routeur doit utiliser le modèle mongoose qui est dans article.js dans models
const article = require("../models/article");

// Toutes ce qui suit et qui commence par "router" sont des middlewares, ça indique au serveur que faire en fonction des requètes
// qu'il reçoit de l'utilisateur. Elles sont en fonction asynchrones ce qui veut dire qu'on lui dit "essaye ça" (try) et "si t'arrive
//pas tu fais ça" (catch).

//c'est la route "principale", on dit "si on te demande ça, tu fais ça".
router.get("/", async (req, res) => {
  try {
    //mais c'est quoi le "ça" qu'il doit faire?
    //on lui dit d'aller chercher le contenu intégral de la bdd
    const arts = await article.find();
    // et de l'envoyer au front
    res.send(arts);
  } catch (err) {
    //Si ça marche pas on envoie une erreur dans la console
    //on pourrait aussi rediriger vers une page en écrivant un truc du genre res.redirect("la page de redirection.html")
    res.jsons({ message: error });
  }
});

// c'est la route qui nous permet d'aller chercher les articles individuellement
router.get("/:articleId", async (req, res) => {
  try {
    //on lui dit quand on te demande un article par son ID, tu vas le chercher dans la bdd
    const art = await article.findById(req.params.articleId);
    //et tu le renvois en json pour que le js du front s'en serve
    res.json(art);
  } catch (err) {
    //ici ça va toujours être le même principe: ça foire=erreur
    res.json({ message: error });
  }
});

// //c'est la route qui doit permettre de supprimer un article,
// router.delete('/:articleId', async(req, res) =>{
//     try{
//         //on lui dit de supprimer de la bdd l'article qui a cet identifiant
//         const removedart= await article.remove({_id : req.params.articleId});
//         //Et de nous renvoyer la base de données sans
//         res.json(removedart)
//     }catch(err){
//         res.json({message :error});}
// });

// //c'est la route qui doit permettre de modifier un article, c'est le même principe que pour supprimer,
// router.put('/:articleId', async(req, res) =>{
//     try{
//         const updatedart= await article.updateOne({_id: req.params.articleId})
//         res.json(updatedart)
//     }catch(err){
//         res.json({message: error});
//     }
// });

// c'est la route qui indique la marche à suivre quand le serveur reçoit un formulaire
router.post("/", async (req, res) => {
  //on lui indique la "tête" des données (bodyparser fait son action ici)
  const art = new article({
    titre: req.body.titre,
    auteur: req.body.auteur,
    createdAt: new Date(),
    article: req.body.article,
  });
  try {
    //on lui dit de charger tout ça dans la bdd
    await art.save();
    //et de nous rediriger vers une page HTML fixe
    res.redirect("accepted.html");
  } catch (err) {
    res.json({ message: error });
  }
});

//on exporte le router pour qu'il puisse être utilisé autre part (app.js)
module.exports = router;
