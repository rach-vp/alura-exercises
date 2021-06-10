const { Router } = require('express');
const ClassesController = require('../controllers/ClassesController');

const router = Router();

router
  .get('/classes', ClassesController.getAll)
  .get('/classes/:id', ClassesController.getClass)
  .post('/classes', ClassesController.createClass)
  .put('/classes/:id', ClassesController.updateClass)
  .delete('/classes/:id', ClassesController.deleteClass);

module.exports = router;