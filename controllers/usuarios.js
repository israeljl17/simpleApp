'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

router.post('/cadastrar', function(req, res) {
    let novoUsuario = new Usuario(req.body);
    Usuario.findOne({
        email: novoUsuario.email
    }, function(err, usuario) {
        if (err) throw err;
        if (!usuario) {
            novoUsuario.senha = bcrypt.hashSync(req.body.senha, 10);
            novoUsuario.save(function(err, usuario) {
                if (err) {
                    return res.status(400).send({
                        erroMsg: "Ocorreu um erro ao cadastrar o Usuario.",
                        erro: err
                    });
                } else {
                    usuario.senha = undefined;
                    return res.json({
                        msg: "Usuario cadastrado!",
                        usuario: usuario
                    });
                }
            });
        } else {
            return res.json({
                erroMsg: "Email já esta cadastrado no sistema."
            });
        }
    });
});

router.post('/login', function(req, res) {
    Usuario.findOne({
        email: req.body.email
    }, function(err, usuario) {
        if (err) throw err;
        if (!usuario || !usuario.comparaSenha(req.body.senha)) {
            return res.json({
                erroMsg: 'Usuario ou senha incorretos!'
            });
        }
        return res.json({
            usuario: usuario.email,
            token: jwt.sign({
                email: usuario.email,
                _id: usuario._id
            }, global.config.jwtSecret, {
                expiresIn: 10
            })
        });
    });
});

router.post('/refresh', function(req, res) {
    Usuario.findOne({
        email: req.body.email
    }, function(err, usuario) {
        if (err) throw err;
        return res.json({
            usuario: usuario.email,
            token: jwt.sign({
                email: usuario.email,
                _id: usuario._id
            }, global.config.jwtSecret, {
                expiresIn: 10
            })
        });
    });
});

module.exports = router;
