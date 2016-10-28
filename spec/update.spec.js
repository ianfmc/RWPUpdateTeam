var AWSMock = require('aws-sdk-mock');
var AWS = require('aws-sdk');

var app = require('../index.js');

var sinon = require('sinon');
var expect = require('chai').expect;
var should = require('chai').should;
var assert = require('chai').assert;

describe('Add a New Team', function() { 

	var context;

	var teamCorrect;
	var teamNoPlayers;

	before(function(){
		AWSMock.mock('DynamoDB.DocumentClient', 'update', function(params, callback) {
			callback();
		});
	});

	beforeEach(function() {
		context = { };
		teamCorrect = {
		    "TeamID" : 1477261819718,
		    "Players" : [
					{
						"First Name" : "Lamar",
				 		"Last Name" : "Connor",
				 		"Cap Number" : "1",
				 		"Position" : "Goalkeeper"
				 	}
				]
			};

		teamNoPlayers = {
		    "Name" : "Blue Bombers",
		    "TeamID" : 1477261819718,
		};
	});

	afterEach(function() {
	});

	it('-- Updates a Team with correct data', sinon.test(function(done) {

		app.handler(teamCorrect, context, function (err, data) {
			expect(err).equal(null);
			expect(data).to.contain('Success');

			done();
		});
	}));

	it('-- Fails when no Players are found', sinon.test(function(done) {

		app.handler(teamNoPlayers, context, function (err, data) {
			expect(err.message).equal('No Players');
			done();
		});
	}));	
});

