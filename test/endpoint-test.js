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

    describe('When /hello/{name} is requested (GET)', function() {

        it('responds with 200', function(done){
            client
                .get('/hello/george', function(e, req, res) {
                    should.equal(res.statusCode, 200);
                    done();
                });
        });

        it('contains the requested name', function(done){
            client
                .get('/hello/george', function(e, req, res) {
                    should.equal(res.body, "\"hello george\"");
                    done();
                });
        });
    });
});
