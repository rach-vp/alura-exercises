const connection = require('../infra/connection');

class Pet {
  add(pet, res) {
    const sql = 'INSERT INTO Pets SET ?';

    connection.query(sql, pet,
      error => error ? res.status(400).json(error) : res.status(200).json(pet));
  }
}

module.exports = new Pet;