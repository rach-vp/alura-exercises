const tableModel = require('../routs/providers/ProvidersTableModel');

tableModel.sync()
  .then(() => console.log('Table successfully created'))
  .catch(() => console.log('Error creating tables'));
