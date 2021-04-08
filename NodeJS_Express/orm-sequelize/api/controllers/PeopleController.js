const database = require('../models');

class PeopleController {
  static async getAll(req, res) {
    try {
      const getAllResult = await database.People.findAll();
      return res.status(200).json(getAllResult);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async getPerson(req, res) {
    try {
      const { id } = req.params;
      const person = await database.People.findOne({
        where: { id: Number(id) },
      });
      return res.status(201).json(person);
    } catch (err) {
      return res.status(404).json(err.message);
    }
  }
}

module.exports = PeopleController;
