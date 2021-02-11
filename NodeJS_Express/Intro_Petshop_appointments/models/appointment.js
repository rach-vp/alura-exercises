const connection = require('../infra/connection');
const moment = require('moment');
const { default: axios } = require('axios');

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
    console.log(errors);

    if (errors.length) {
      result.status(400).json(errors) }
    else {
      const appointmentFullRecord = {...appointment, dataCreation, data};
      const sql = 'INSERT INTO Appointments SET ?';
      connection.query(sql, appointmentFullRecord, (error) => {
        if (error) {
          result.status(400).json(error);
        } else {
          result.status(201).json(appointment);
        }
      });
        // (error) => error ? result.status(400).json(error) : result.status(201).json(appointment));
    }
  }

  list(result) {
    const sql = 'SELECT * FROM Appointments';

    connection.query(sql, (error, results) => error ? result.status(400).json(error) : result.status(200).json(results));
  }

  queryID (id, result) {
    const sql = `SELECT * FROM Appointments WHERE id=${id}`;

    connection.query(sql, async (error, results) => {
      const queriedAppointment = results[0];
      const cpf = queriedAppointment.client;

      if (error) { result.status(400).json(); }
      else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);
        queriedAppointment.client = data;
        result.status(200).json(queriedAppointment);
      }
    });
  }

  update(id, appointment, result) {
    const sql = 'UPDATE Appointments SET ? WHERE id=?';

    connection.query(sql, [appointment, id], (error) => {
      if (appointment.data) {
        appointment.data = moment(appointment.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
      }
      error ? result.status(400).json() : result.status(200).json({ ...appointment, id });
    });
  }

  delete(id, result) {
    const sql = 'DELETE FROM Appointments WHERE id=?';

    connection.query(sql, (error, results) =>
      error ? result.status(400).json() : result.status(200).json({ id }));
  }
}

module.exports = new Appointment;
