const router = require('express').Router({ mergeParams: true });
const Table = require('./ProductTable');
const Product = require('./Product');
const { ProductsSerializer } = require('../../../Serializer');

// List all products from a provider
router.get('/', async (req, res) => {
  const products = await Table.list(req.provider.id);
  const serializer = new ProductsSerializer(res.getHeader('Content-Type'));
  res.status(200).send(serializer.serialize(products));
});

// Create a new product
router.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const provider = req.provider.id;
    const data = { ...body, provider };
    const product = new Product(data);
    await product.create();
    const serializer = new ProductsSerializer(res.getHeader('Content-Type'));
    res.status(201).send(serializer.serialize(product));
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
    const serializer = new ProductsSerializer(
      res.getHeader('Content-Type'),
      ['price', 'stock', 'provider', 'dateCreation', 'dateUpdate', 'version'],
    );
    res.status(201).send(serializer.serialize(product));
  } catch(error) {
    next(error);
  }
});

// Update product info
router.put('/:id', async (req, res, next) => {
  try {
    const data = {
      id: req.params.id,
      provider: req.provider.id,
    };
    const dataToUpdate = req.body;
    const dataUpdated = { ...data, ...dataToUpdate };
    const product = new Product(dataUpdated);
    await product.update();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
