const { Router } = require('express');
const PeopleController = require('../controllers/PeopleController');

const router = Router();

router.get('/people', PeopleController.getAll);
router.get('/people/:id', PeopleController.getPerson);

router.post('/people', PeopleController.createPerson);

router.put('/people/:id', PeopleController.updatePerson);

router.delete('/people/:id', PeopleController.deletePerson);

module.exports = router;
