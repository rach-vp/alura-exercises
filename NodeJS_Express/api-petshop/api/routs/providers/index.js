const router = require('express').Router();
const ProvidersTable = require('./ProvidersTable');
const Provider = require('./Provider');

//List all providers
router.get('/', async (req, res) => {
  const result = await ProvidersTable.list();
  res.send(
    JSON.stringify(result)
  )
});

// Create new provider
router.post('/', async (req, res) => {
  const receivedData = req.body;
  const provider = new Provider(receivedData);
  await provider.create();
  res.send(JSON.stringify(provider));
});

// List provider by id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const provider = new Provider({ id });
    await provider.getProvider();
    res.status(200).send(JSON.stringify(provider));

  } catch ({ message }) {
    res.status(400).send(JSON.stringify({ message }));
  }
})

module.exports = router;
