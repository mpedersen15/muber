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

    it (`should update a driver's driving property on PUT to /api/drivers/:id`, (done) => {
        const driver = new Driver({
            email: 't@t.com',
            driving: false
        })
        driver.save()
            .then(() => {
                request(app)
                    .put(`/api/drivers/${driver._id}`)
                    .send({ driving: true })
                    .end((err, res) => {
                        Driver.findOne({ email: 't@t.com'})
                            .then(foundDriver => {
                                assert(foundDriver.driving === true);
                                done();
                            });
                    });
            });
    });

    it('should delete a drive on DELETE to /api/drivers/:id', (done) => {
        const driver = new Driver({
            email: 'm@m.com'
        });

        driver.save()
            .then(() => {
                request(app)
                    .delete(`/api/driver/${driver.id}`)
                    .end((err, res) => {
                        Driver.find({ email: 'm@m.com' })
                            .then(drivers => {
                                assert(drivers.length === 0);
                                done();
                            });
                    });
            });
    });

    it('should find drivers near a location on GET to /api/drivers', done => {
        const seattleDriver = new Driver({
            email: 'seattle@test.com',
            geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
        });

        const miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
        });

        Promise.all([seattleDriver.save(), miamiDriver.save()])
            .then(() =>  {
                request(app)
                    .get(`/api/drivers?lng=-80&lat=25`)
                    .end((err, res) => {
                        assert(res.body.length === 1);
                        assert(res.body[0].email === 'mianmi@test.com');
                        done();
                    })
            });
    });

});