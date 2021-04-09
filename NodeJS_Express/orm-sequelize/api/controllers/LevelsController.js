const database = require('../models');

class LevelController {
  static async getAll(req, res){
    try {
      const getAllResult = await database.Levels.findAll();
      return res.status(200).json(getAllResult);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getLevel(req, res) {
    try {
      const { id } = req.params;
      const level = await database.Levels.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(level)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createLevel(req, res) {
    try {
      const levelData = req.body;
      const levelCreated = await database.Levels.create(levelData);
      return res.status(200).json(levelCreated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateLevel(req, res) {
    try {
      const { id } = req.params;
      const info = req.body;
      await database.Levels.update(
        info,
        { where: { id: Number(id) } },
      );
      const updatedLevel = await database.Levels.findOne( { where: { id: Number(id) }});
      return res.status(200).json(updatedLevel);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async deleteLevel(req, res) {
    try {
      const { id } = req.params;
      await database.Levels.destroy(
        { where: { id: Number(id) }},
      );
      return res.status(200).json({ mensagem: `id ${id} deleted` });

    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

}

module.exports = LevelController;