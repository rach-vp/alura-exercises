const Appointments = require('../models/appointments');

module.exports = app => {
  app.get('/appointments', (req, res) => {
    Appointments.list()
      .then(result => res.status(200).json(result))
      .catch(err => res.status(400).json(err));
  });

  app.get('/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Appointment.queryID(id, res);
  });

  app.post('/appointments', (req, res) => {
    const appointment = req.body;
    Appointments.add(appointment, res)
      .then((appointmentCreated) => res.status(201).json(appointmentCreated))
      .catch(err => res.status(400).json(err));
  });

  app.patch('/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;
    Appointments.update(id, values, res);
  });

  app.delete('/appointments/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Appointments.delete(id, res);
  });
}
