const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Express app', () => {
    it ('should GET the correct message', (done) => {
        request(app)
            .get('/api')
            .end((err, response) => {
                // console.log(err);
                // console.log(response);
                assert(response.status === 200);
                assert(response.body.message === "Hello!");
                done();
            });
    });
});