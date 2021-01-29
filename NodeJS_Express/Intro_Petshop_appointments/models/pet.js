const connection = require('../infra/connection');
const fileUpload = require('../files/filesUpload');

class Pet {
  add(pet, res) {
    const sql = 'INSERT INTO Pets SET ?';

    fileUpload(pet.picture, pet.name, (error, newPath) => {
      if (error) { res.status(400).json({ error }); }
      else {
        const newPet = { name: pet.name, picture: newPath };

        connection.query(sql, pet,
          error => error ? res.status(400).json(error) : res.status(200).json(newPet));
      }
    });
  }
}

module.exports = new Pet;