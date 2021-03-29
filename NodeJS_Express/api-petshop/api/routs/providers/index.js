const router = require('express').Router();
const ProvidersTable = require('./ProvidersTable');
const Provider = require('./Provider');

// List all providers
router.get('/', async (req, res) => {
  const result = await ProvidersTable.list();
  res.status(200).send(
    JSON.stringify(result)
  )
});

// Create new provider
router.post('/', async (req, res) => {
  try {
    const receivedData = req.body;
    const provider = new Provider(receivedData);
    await provider.create();
    res.status(201).send(JSON.stringify(provider));
  } catch ({ message }) {
    res.status(400).send(JSON.stringify({ message }))
  }
});

// List provider by id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const provider = new Provider({ id });
    await provider.getProvider();
    res.status(200).send(JSON.stringify(provider));

  } catch ({ message }) {
    res.status(404).send(JSON.stringify({ message }));
  }
});

// Update provider info
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const provider = new Provider({ ...id, data });
    await provider.update();
    res.status(204).end();
  } catch ({ message }) {
    res.status(400).send(JSON.stringify({ message }));
  }
});

// Delete provider
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const provider = new Provider({ id });
  try {
    await provider.getProvider();
    await provider.delete();
    res.status(204).end();
  } catch ({ message }) {
    res,status(404).send(JSON.stringify({ message }));
  }
});

module.exports = router;