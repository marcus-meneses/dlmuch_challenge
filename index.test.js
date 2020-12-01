'use strict';
const test = require('tape');
var request = require('supertest');
const app = require('./index');

test('GET /recipes', function(assert) {
  request(app)
    .get('/recipes/?i=onion,tomato')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      var fs = require('fs');
      let s = fs.readFileSync('exp.json', 'utf8');
      let expectedResponse = s;
      let actualResponse = JSON.stringify(res.body);
      // console.log(expectedResponse);

      assert.error(err, 'No error');
      assert.same(actualResponse, expectedResponse, 'Retrieve recipe dataset');
      assert.end();
    });
});

