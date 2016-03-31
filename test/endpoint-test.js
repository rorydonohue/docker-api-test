'use strict';

var restify = require('restify');
var config = require('config');

var should = require('should');

var client = restify.createJsonClient({
    url: 'http://127.0.0.1:' + config.api.port,
    version: '*'
});

describe('given a server', function() {
    var server = require('../server');

    describe('When / is requested (GET)', function() {

        it('responds with 200', function(done){
            client
                .get('/', function(e, req, res) {
                    res.statusCode.should.equal(200);
                    done();
                });
        });
    });


    describe('When /hello/{name} is requested (GET)', function() {

        it('responds with 200', function(done){
            client
                .get('/hello/george', function(e, req, res) {
                    res.statusCode.should.equal(200);
                    done();
                });
        });

        it('contains the requested name', function(done){
            client
                .get('/hello/george', function(e, req, res) {
                    res.body.should.equal("\"hello george\"");
                    done();
                });
        });
    });

    describe('When /hello/{name} is requested (DELETE)', function() {

        it('responds with 204', function(done){
            client
                .del('/hello/george', function(e, req, res) {
                    res.statusCode.should.equal(204);
                    done();
                });
        });
    });

    describe('When /hello is requested (POST)', function() {

        it('responds with 201', function(done){
            client
                .post('/hello', function(e, req, res) {
                    res.statusCode.should.equal(201);
                    done();
                });
        });

        it('responds with a username of 8 characters', function(done){
            client
                .post('/hello', function(e, req, res) {
                    res.body.should.be.type('string');
                    res.body.should.have.lengthOf(10);
                    done();
                });
        });
    });
});
