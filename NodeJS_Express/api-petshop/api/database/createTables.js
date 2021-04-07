const models = [
  require('../routs/providers/ProvidersTableModel'),
  require('../routs/providers/products/ProductTableModel'),
];

async function createTables() {
  models.forEach((model) => model.sync());
}

createTables();
