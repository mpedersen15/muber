const Driver = require('../models/driver');
module.exports = {
    greeting(req, res) {
        res.status(200).send({message: 'Hello!'})
    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.status(200).send(driver))
            .catch(next)
    }

};