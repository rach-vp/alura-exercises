const connection = require('../infra/connection');
const moment = require('moment');

class Appointment {
  add(appointment, result) {
    const dataCreation = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(appointment.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    const isValidDate = moment(data).isSameOrAfter(dataCreation);
    const isValidClient = appointment.client.length >= 5;
    const validations = [
      {
        name: 'data',
        data: data,
        teste: dataCreation,
        valid: isValidDate,
        message: 'Date must be greater or equal current date',
      },
      {
        name: 'client',
        data: appointment.client,
        valid: isValidClient,
        message: 'Client name must have at least 5 characters'
      }
    ];
    const errors = validations.filter(({ valid }) => !valid);

    if (errors.length) {
      result.status(400).json(errors) }
    else {
      const appointmentFullRecord = {...appointment, dataCreation, data};
      const sql = 'INSERT INTO Appointments SET ?';
      connection.query(sql, appointmentFullRecord,
        (erro) => erro ? result.status(400).json(erro) : result.status(201).json(result));
    }

  }

  list(result) {
    const sql = 'SELECT * FROM Appointments';

    connection.query(sql, (error, results) => error ? result.status(400).json(error) : result.status(200).json(results));
  }

  queryID (id, result) {
    const sql = `SELECT * FROM Appointments WHERE id=${id}`;

    connection.query(sql, (error, results) =>
      error ? result.status(400).json() : result.status(200).json(results[0]));
  }

  change(id, appointment, result) {
    const sql = `UPDATE Appointments SET ? WHERE id=?`;

    connection.query(sql, [appointment, id], (error, results) => {
      if (appointment.data) { appointment.data = moment(appointment.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') }
      error ? result.status(400).json() : result.status(200).json(results);
    });
  }
}

module.exports = new Appointment;
