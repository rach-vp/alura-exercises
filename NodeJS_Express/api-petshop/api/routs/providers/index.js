const router = require('express').Router();
const ProvidersTable = require('./ProvidersTable');
const Provider = require('./Provider');

router.get('/', async (req, res) => {
  const result = await ProvidersTable.list();
  res.send(
    JSON.stringify(result)
  )
});

router.post('/', async (req, res) => {
  const receivedData = req.body;
  const provider = new Provider(receivedData);
  await provider.create();
  res.send(JSON.stringify(provider));
})

module.exports = router;
