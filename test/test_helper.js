const mongoose = require('mongoose');

before((done) => {
    mongoose.connect('mongodb://localhost/muber_test');
    mongoose.connection
        .once('open', () => {
            console.log('connected to database');
            done();
        })
        .on('error', error => console.warn('Warning - ', error));
});

beforeEach(done => {
    mongoose.connection.collections.drivers.drop()
        .then(() => {
            console.log('Database drivers dropped');
            done();
        })
        .catch((error) => {
            console.warn('Error dropping database', error);
            done()
        });
});