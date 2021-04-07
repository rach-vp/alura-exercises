const router = require('express').Router({ mergeParams: true });
const Table = require('./ProductTable');
const Product = require('./Product');

// List all products from a provider
router.get('/', async (req, res) => {
  const products = await Table.list(req.params.providerId);
  res.send(JSON.stringify(products));
});

// Create a new product
router.post('/', async (req, res) => {
  const body = req.body;
  const provider = req.params.providerId;
  const data = { ...body, provider };
  const product = new Product(data);
  await product.create();
  res.status(201).send(product);
});

module.exports = router;
