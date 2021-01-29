const Appointment = require('../models/appointment');

module.exports = app => {
  app.get('/appointments', (req, res) => Appointment.list(res));
  app.get('/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Appointment.queryID(id, res);
  });

  app.post('/appointments', (req, res) => {
    const appointment = req.body;
    Appointment.add(appointment, res);
    res.send('POST appointment');
  });

  app.patch('/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;
    Appointment.update(id, values, res);
  });

  app.delete('/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Appointment.delete(id, res);
  });
}