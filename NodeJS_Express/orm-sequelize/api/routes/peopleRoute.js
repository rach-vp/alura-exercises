const { Router } = require('express');
const PeopleController = require('../controllers/PeopleController');

const router = Router();

router
  .get('/people', PeopleController.getAll)
  .get('/people/:id', PeopleController.getPerson)
  .post('/people', PeopleController.createPerson)
  .put('/people/:id', PeopleController.updatePerson)
  .delete('/people/:id', PeopleController.deletePerson)
  .get(
    '/people/:studentId/registrations/:registrationId',
    PeopleController.getRegistration,
  );

module.exports = router;
