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
}

module.exports = PeopleController;
