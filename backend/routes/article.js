const express = require('express');
const router= express.Router();
const article= require('../models/article');

router.get('/',async (req, res)=>{
    try{
        const arts = await this.article.find();
        res.json(arts);
    }catch (err){
        res.jsons({message:error});}
});

router.get('/:articleID', async (req, res) => {
    try{
        const art = await article.findById(req.params.articleID);
        res.json(art);
    }catch(err){
        res.json({message:error});}
});

router.delete('/:articleID', async(req, res) =>{
    try{
        const removedart= await article.remove({_id : req.params.articleID});
        res.json(removedart)
    }catch(err){
        res.json({message :error});}
});

router.put('/:articleID', async(req, res) =>{
    try{
        const updatedart= await article.updateOne({_id: req.params.articleID})
    }catch(err){
        res.json({message: error});
    }
});

router.post('/', async(req,res) =>{
    const art= new article({
        titre: req.body.titre,
        auteur: req.body.auteur,
        date: req.body.date,
        article: req.body.article});
    try{
        const savedart= await art.save();
        res.json(savedart);
    }catch(err){
        res.json({message: err})}
});


module.exports = router;