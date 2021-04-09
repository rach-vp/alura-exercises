const database = require('../models');

class ClassesController {
  static async getAll(req, res){
    try {
      const getAllResult = await database.Classes.findAll();
      return res.status(200).json(getAllResult);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getClass(req, res) {
    try {
      const { id } = req.params;
      const classResult = await database.Classes.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(classResult);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createClass(req, res) {
    try {
      const newClass = req.body;
      const newClassCreated = await database.Classes.create(newClass);
      return res.status(200).json(newClassCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateClass(req, res) {
    try {
      const { id } = req.params;
      const info = req.body;
      await database.Classes.update(
        info,
        { where: { id: Number(id) }},
      );
      const updatedClass = await database.Classes.findOne(
        { where: { id: Number(id) }},
      );
      return res.status(200).json(updatedClass);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteClass(req, res) {
    try {
      const { id } = req.params;
      await database.Classes.destroy(
        { where: { id: Number(id) }}
      );
      return res.status(200).json({ mensagem: `id ${id} deleted` });

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

}

module.exports = ClassesController;