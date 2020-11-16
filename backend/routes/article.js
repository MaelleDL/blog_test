const express = require('express');
const router= express.Router();
const article= require('../models/article');

router.get('/',async (req, res)=>{
    try{
        res.sendFile('index.html');
    }catch (err){
        res.jsons({message:error});}
});

router.get('/:articleId', async (req, res) => {
    try{
        const art = await article.findById(req.params.articleId);
        res.json(art);
    }catch(err){
        res.json({message:error});}
});

// router.delete('/:articleId', async(req, res) =>{
//     try{
//         const removedart= await article.remove({_id : req.params.articleId});
//         res.json(removedart)
//     }catch(err){
//         res.json({message :error});}
// });

// router.put('/:articleID', async(req, res) =>{
//     try{
//         const updatedart= await article.updateOne({_id: req.params.articleId})
//         res.json(updatedart)
//     }catch(err){
//         res.json({message: error});
//     }
// });

router.post('/', async(req,res) =>{
    const art= new article({
        titre: req.body.titre,
        auteur: req.body.auteur,
        createdAt: new Date(),
        article: req.body.article});
    try{
        await art.save();
        res.redirect("accepted.html");;
    }catch(err){
        res.json({message: err})}
});


module.exports = router;