const router = require('express').Router({ mergeParams: true });
const Table = require('./ProductTable');
const Product = require('./Product');

// List all products from a provider
router.get('/', async (req, res) => {
  const products = await Table.list(req.provider.id);
  res.status(200).send(JSON.stringify(products));
});

// Create a new product
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const provider = req.provider.id;
    const data = { ...body, provider };
    const product = new Product(data);
    await product.create();
    res.status(201).send(product);
  } catch (error) {
    next(error);
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  const data = {
    id: req.params.id,
    provider: req.provider.id,
  };
  const product = new Product(data);
  await product.delete();
  res.status(204).end();
});

// Show product details
router.get('/:id', async (req, res, next) => {
  try {
    const data = {
      id: req.params.id,
      provider: req.provider.id,
    };
    const product = new Product(data);
    await product.getProduct();
    res.status(201).send(JSON.stringify(product));
  } catch(error) {
    next(error);
  }
});

module.exports = router;
