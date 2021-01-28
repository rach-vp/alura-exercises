const connection = require("../infra/connection");

class Appointment {
  add(appointment) {
    const sql = 'INSERT INTO Appointments SET ?';
    connection.query(sql, appointment, (erro, result) => erro ? console.log(erro) : console.log(result));
  }
}

module.exports = new Appointment;