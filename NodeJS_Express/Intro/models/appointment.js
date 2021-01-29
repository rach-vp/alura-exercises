const connection = require('../infra/connection');
const moment = require('moment');

class Appointment {
  add(appointment) {
    const dataCreation = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(appointment.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    const appointmentFullRecord = {...appointment, dataCreation, data};
    const sql = 'INSERT INTO Appointments SET ?';
    connection.query(sql, appointmentFullRecord,
      (erro, result) => erro ? result.status(400).json(erro) : result.status(201).json(result));
  }
}

module.exports = new Appointment;
