const router = require('express').Router({ mergeParams: true });
const Table = require('./ProductsTable');

router.get('/', async (req, res) => {
  const products = await Table.list(req.params.idProvider);
  res.send(JSON.stringify(products));
});

module.exports = router;
