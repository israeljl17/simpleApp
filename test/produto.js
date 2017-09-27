'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

const mongoose = require('mongoose');
const Produto = mongoose.model('Produto');
const Usuario = mongoose.model('Usuario');

chai.use(chaiHttp);

describe('Produtos', function() {
    beforeEach(function(done) {
        Produto.remove({}, function(error) {
            done();
        });
    });

    before(function(done) {
        Usuario.remove({}, function(error) {
            done();
        });
    });

    var usuario = {"email": "teste@teste.com", "senha": "12"};
    var token = null;

    describe('/POST usuarios/cadastrar', function() {
        it('Deve cadastrar um usuario para os testes', function(done) {
            chai.request(server)
                .post('/api/usuarios/cadastrar')
                .send(usuario)
                .end(function(error, res) {
                    res.body.should.have.property('msg').eql('Usuario cadastrado!');
                    done();
                });
        });
    });

    describe('/POST usuarios/login', function() {
        it('Deve realizar login para os testes', function(done) {
            chai.request(server)
                .post('/api/usuarios/login')
                .send(usuario)
                .end(function(error, res) {
                    res.body.should.have.property('token');
                    token = res.body.token;
                    done();
                });
        });
    });

    /**
     * Teste da rota: /GET
     */
    describe('/GET produtos', function() {
        it('Deve retornar todos os produtos', function(done) {
            chai.request(server)
                .get('/api/produtos')
                .set('access_token', token)
                .end(function(error, res) {
                    console.log(res.body.token);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    //res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    /**
     * Teste da rota: /POST
     */
    describe('/POST produto', function() {
        it('Deve adicionar um produto teste', function(done) {

            var produto = {
                nome: "Produto Teste POST",
                preco: 5,
                quantidade: 10
            }
            chai.request(server)
                .post('/api/produtos')
                .set('access_token', token)
                .send(produto)
                .end(function(error, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Produto adicionado.');
                    res.body.produto.should.have.property('nome');
                    res.body.produto.should.have.property('preco');
                    res.body.produto.should.have.property('quantidade');
                    done();
                });
        });
    });


    /**
     * Teste da rota: /GET/:id
     */
    describe('/GET/:id produto', function() {
        it('Deve retornar um produto dado o id', function(done) {
            var produto = new Produto({
                nome: "Produto Teste GET id",
                preco: 5,
                quantidade: 10
            })
            produto.save(function(error, produto) {
                chai.request(server)
                    .get('/api/produtos/' + produto._id)
                    .set('access_token', token)
                    .end(function(error, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('nome');
                        res.body.should.have.property('preco');
                        res.body.should.have.property('quantidade');
                        done();
                    });
            });
        });
    });

    /**
     * Teste da rota: /PUT/:id
     */
    describe('/PUT/:id produto', function() {
        it('Deve atualizar um produto dado o id', function(done) {
            var produto = new Produto({
                nome: "Produto Teste PUT id",
                preco: 5,
                quantidade: 10
            })
            produto.save(function(error, produto) {
                chai.request(server)
                    .put('/api/produtos/' + produto._id)
                    .set('access_token', token)
                    .send({
                        nome: "Produto Teste Alterado",
                        preco: 10,
                        quantidade: 10
                    })
                    .end(function(error, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('msg').eql('Produto atualizado.');
                        res.body.produto.should.have.property('preco').eql(10);
                        done();
                    });
            });
        });
    });

    /**
     * Teste da rota: /DELETE/:id
     */
    describe('/DELETE/:id produto', function() {
        it('Deve excluir um produto dado o id', function(done) {
            var produto = new Produto({
                nome: "Produto Teste DELETE id",
                preco: 5,
                quantidade: 10
            })
            produto.save(function(error, produto) {
                chai.request(server)
                    .delete('/api/produtos/' + produto._id)
                    .set('access_token', token)
                    .end(function(error, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('msg').eql('Produto deletado.');
                        done();
                    });
            });
        });
    });
});
