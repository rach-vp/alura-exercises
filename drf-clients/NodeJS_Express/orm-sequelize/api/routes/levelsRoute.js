const { Router } = require('express');
const LevelsController = require('../controllers/LevelsController');

const router = Router();

router
  .get('/levels', LevelsController.getAll)
  .get('/levels/:id', LevelsController.getLevel)
  .post('/levels', LevelsController.createLevel)
  .put('/levels/:id', LevelsController.updateLevel)
  .delete('/levels/:id', LevelsController.deleteLevel);

module.exports = router;