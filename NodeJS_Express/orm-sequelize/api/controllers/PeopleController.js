const database = require('../models');

class PeopleController {
  static async getAll(req, res) {
    try {
      const getAllResult = await database.People.scope('all').findAll();
      return res.status(200).json(getAllResult);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async getAllActive(req, res) {
    try {
      const activesResult = await database.People.findAll();
      return res.status(200).json(activesResult);
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

  static async createPerson(req, res) {
    try {
      const personData = req.body;
      const personCreated = await database.People.create(personData);
      return res.status(200).json(personCreated);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async updatePerson(req, res) {
    try {
      const { id } = req.params;
      const info = req.body;
      await database.People.update(
        info,
        { where: { id: Number(id) } },
      );
      const updatedPerson = await database.People.findOne(
        { where: { id: Number(id) } },
      );
      res.status(200).json(updatedPerson);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async deletePerson(req, res) {
    try {
      const { id } = req.params;
      await database.People.destroy({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: `id ${id} successfully deleted` });
    } catch (err) {
      res.status(404).json(err.message);
    }
  }

  static async getRegistration(req, res) {
    try {
      const { studentId, registrationId } = req.params;
      const registration = await database.Registrations.findOne({
        where: {
          id: Number(registrationId),
          student_id: Number(studentId),
        },
      });
      return res.status(201).json(registration);
    } catch (err) {
      return res.status(404).json(err.message);
    }
  }

  static async createRegistration(req, res) {
    try {
      const studentId = req.params;
      const registrationData = { ...req.body, studentId: Number(studentId)};
      const registrationCreated = await database.Registrations.create(registrationData);
      return res.status(200).json(registrationCreated);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async updateRegistration(req, res) {
    try {
      const { studentId, registrationId } = req.params;
      const info = req.body;
      await database.People.update(
        info,
        {
          where: {
            id: Number(registrationId),
            student_id: Number(studentId),
          },
        },
      );
      const updatedRegistration = await database.Registrations.findOne({
        where: {
          id: Number(registrationId),
          student_id: Number(studentId),
        },
      });
      res.status(200).json(updatedRegistration);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }

  static async deleteRegistration(req, res) {
    try {
      const { studentId, registrationId } = req.params;
      await database.People.destroy({
        where: {
          id: Number(registrationId),
          student_id: Number(studentId),
        },
      });
      res.status(200).json({ message: `id ${id} successfully deleted` });
    } catch (err) {
      res.status(404).json(err.message);
    }
  }
}

module.exports = PeopleController;
