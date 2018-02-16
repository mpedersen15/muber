const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');

const Driver = mongoose.model('driver');

describe('Drivers controller', () => {

    it('should create a new driver on POST to /api/drivers', (done) => {

        Driver.count()
            .then(count => {


                request(app)
                    .post('/api/drivers')
                    .send({ email: "matt@matt.com" })
                    .end((err, res) => {
                        Driver.count()
                            .then(newCount => {
                                assert(count + 1 === newCount);
                                done();
                            });
                    });
            });
        
        
    });

});