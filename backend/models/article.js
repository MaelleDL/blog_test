const mongoose = require('mongoose');

const artSchema = mongoose.Schema({
    titre:{
        type: String,
        required: true
        },
    auteur:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    article:{
        type: String,
        required: true
    },
    });

module.exports= mongoose.model('article', artSchema);