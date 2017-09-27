'use strict';

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {

    let token = req.body.token || req.query.token || req.headers['access_token'];

    if (token) {
        jwt.verify(token, global.config.jwtSecret, function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    msg: 'Falha ao tentar autenticar o token. Erro: ' + err.message
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            msg: 'Realize o login.'
        });
    }
};
