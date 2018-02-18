const Driver = require('../models/driver');
module.exports = {
    greeting(req, res) {
        res.status(200).send({message: 'Hello!'})
    },

    index(req, res, next) {
        const { lng, lat } = req.query;

        Driver.aggregate([
            {
                $geoNear: {
                    near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                    spherical: true,
                    maxDistance: 200000,
                    distanceField: 'distance.calculated'
                }
            }
        ])
            .then(drivers => {
                res.send(drivers);
            })
            .catch( error => console.log(error));
    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.status(200).send(driver))
            .catch(next)
    },

    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate(driverId, driverProps)
            .then(() => Driver.findById(driverId))
            .then(driver => res.status(200).send(driver))
            .catch(next);
    },

    remove(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndRemove(driverId)
            .then(driver => res.status(204).send(driver))
            .catch(next);
    }

};