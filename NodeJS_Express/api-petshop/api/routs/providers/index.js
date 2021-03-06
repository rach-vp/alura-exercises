const router = require('express').Router();
const ProvidersTable = require('./ProvidersTable');
const Provider = require('./Provider');
const { ProvidersSerializer } = require('../../Serializer');

router.options('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-type');
  res.status(204).end();
});

router.options('/:id', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'GET, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-type');
  res.status(204).end();
});

// List all providers
router.get('/', async (req, res) => {
  const result = await ProvidersTable.list();
  const serializer = new ProvidersSerializer(res.getHeader('Content-Type'));

  res.status(200).send(
    serializer.serialize(result)
  )
});

// Create new provider
router.post('/', async (req, res, next) => {
  try {
    const receivedData = req.body;
    const provider = new Provider(receivedData);
    await provider.create();
    const serializer = new ProvidersSerializer(res.getHeader('Content-Type'));

    res.status(201).send(serializer.serialize(provider));
  } catch (error) {
    next(error);
  }
});

// List provider by id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const provider = new Provider({ id });
    await provider.getProvider();
    const serializer = new ProvidersSerializer(
      res.getHeader('Content-Type'),
      ['email', 'dateCreation', 'dateUpdate', 'version'],
    );

    res.status(200).send(serializer.serialize(provider));
  } catch (error) {
    next(error);
  }
});

// Update provider info
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const provider = new Provider({ ...id, data });
    await provider.update();

    res.status(204).end();
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
  }
});

const productsRouter = require('./products');

const validateProvider = async (req, res, next) => {
  try {
    const id = req.params.providerId;
    const provider = new Provider({ id });
    await provider.getProvider();
    req.provider = provider;
    next();
  } catch (error) {
    next(error);
  }
};

router.use('/:providerId/products', validateProvider, productsRouter);

module.exports = router;
