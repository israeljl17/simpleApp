'use strict';

let mongoose = require('mongoose');

// Produto Schema
let produtoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    }
});

let Produto = module.exports = mongoose.model('Produto', produtoSchema);
