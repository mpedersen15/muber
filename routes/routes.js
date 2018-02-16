const DriversController = require('../controllers/drivers_controllers');
module.exports = (app) => {
    app.get('/api', DriversController.greeting);

    app.post('/api/drivers', DriversController.create)
}