const router = require('express').Router();
const ProvidersTable = require('./ProvidersTable');

router.use('/', async (req, res) => {
  const result = await ProvidersTable.list();
  res.send(
    JSON.stringify(result)
  )
});

module.exports = router;
