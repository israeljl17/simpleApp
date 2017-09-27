'use strict';

const express = require('express');
const router = express.Router();
const verificaToken = require('./verificaToken');
const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');

router.get('/', verificaToken, function(req, res) {
    Produto.find({}, function(err, produtos) {
        if (err)
            res.send({
                erroMsg: "Ocorreu um erro ao consultar os Produtos.",
                erro: err
            });
        res.json(produtos);
    });
});

router.post('/', verificaToken, function(req, res) {
    var novoProduto = new Produto(req.body);
    novoProduto.save(function(err, produto) {
        if (err)
            res.send({
                erroMsg: "Ocorreu um erro ao adicionar o Produto.",
                erro: err
            });
        res.json({
            msg: "Produto adicionado.",
            produto: produto
        });
    });
});

router.get('/:id', verificaToken, function(req, res) {
    Produto.findById(req.params.id, function(err, produto) {
        if (err)
            res.send({
                erroMsg: "Produto não encontrado.",
                erro: err
            });
        res.json(produto);
    });
});

router.put('/:id', verificaToken, function(req, res) {
    Produto.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true
    }, function(err, produto) {
        if (err)
            res.send({
                erroMsg: "Ocorreu um erro ao atualizar o Produto.",
                erro: err
            });
        res.json({
            msg: "Produto atualizado.",
            produto: produto
        });
    });
});

router.delete('/:id', verificaToken, function(req, res) {
    Produto.remove({
        _id: req.params.id
    }, function(err, produto) {
        if (err)
            res.send({
                erroMsg: "Ocorreu um erro ao deletar o Produto.",
                erro: err
            });
        res.json({
            msg: 'Produto deletado.'
        });
    });
});

module.exports = router;
