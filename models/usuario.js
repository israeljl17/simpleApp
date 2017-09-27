'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Usuario Schema
const UsuarioSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
});

UsuarioSchema.methods.comparaSenha = function(senha) {
    return bcrypt.compareSync(senha, this.senha);
};

const Usuario = module.exports = mongoose.model('Usuario', UsuarioSchema);
