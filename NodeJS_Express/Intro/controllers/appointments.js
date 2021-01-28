const Appointment = require('../models/appointment');

module.exports = app => {
  app.get('/appointments', (req, res) => res.send('You are at appointments rout using GET'));
  app.post('/appointments', (req, res) => {
    const appointment = req.body;
    Appointment.add(appointment);
    res.send('POST appointment');
  });
}