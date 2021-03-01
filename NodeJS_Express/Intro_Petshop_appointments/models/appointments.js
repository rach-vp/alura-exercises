const connection = require('../infra/connection');
const repos = require('../repos/appointment');
const moment = require('moment');
const axios = require('axios');

class Appointments {
  constructor() {
    this.isValidDate = ({ date, creationDate }) => moment(date).isSameOrAfter(creationDate);
    this.isValidClient = length => length >= 5;
    this.validations = [
      {
        name: 'date',
        isValid: this.isValidDate,
        message: 'Date must be greater or equal today',
      },
      {
        name: 'client',
        isValid: this.isValidClient,
        message: 'Client name must have at least 5 characters',
      }
    ]
  }
  validate(params) {
    return this.validations.filter(({ name, isValid }) => {
      const param = params[name];
      return !isValid(param);
    }).length;
  }

  add(appointment) {
    const dataCreation = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(appointment.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    const params = {
      data: { data, dataCreation },
      client: { length: appointment.client.length }
    };
    const errors = this.validate(params);

    if (errors) {
      return new Promise((resolve, reject) => reject(errors));
    } else {
      const appointmentFullRecord = {...appointment, dataCreation, data};
      return repos.add(appointmentFullRecord).then(res => {
        const id = res.insertedId;
        return { ...appointment, id };
      })
    }
  }

  list() {
    return repos.list();
  }

  queryID(id, result) {
    const sql = `SELECT * FROM Appointments WHERE id=${id}`;

    connection.query(sql, async (error, results) => {
      const queriedAppointment = results[0];
      const cpf = queriedAppointment.client;

      if (error) { result.status(400).json(error); }
      else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);
        queriedAppointment.client = data;
        result.status(200).json(queriedAppointment);
      }
    });
  }

  update(id, appointment, result) {
    if (appointment.data) {
      appointment.data = moment(appointment.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }

    const sql = 'UPDATE Appointments SET ? WHERE id=?';

    connection.query(sql, [appointment, id], (error) => {
      if (error) {
        result.status(400).json(error);
      } else {
        result.status(200).json({ ...appointment, id });
      }
    });
  }

  delete(id, result) {
    const sql = 'DELETE FROM Appointments WHERE id=?';

    connection.query(sql, (error) =>
      error ? result.status(400).json(error) : result.status(200).json({ id }));
  }
}

module.exports = new Appointments();
