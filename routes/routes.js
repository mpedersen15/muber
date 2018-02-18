const DriversController = require('../controllers/drivers_controllers');
module.exports = (app) => {
    app.get('/api', DriversController.greeting);

    app.get('/api/drivers', DriversController.index);
    app.post('/api/drivers', DriversController.create);
    app.put('/api/drivers/:id', DriversController.edit);
    app.delete('/api/driver/:id', DriversController.remove);

}