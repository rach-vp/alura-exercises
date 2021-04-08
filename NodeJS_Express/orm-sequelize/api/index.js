const express = require('express');
const routes = require('./routes');

const app = express();
const port = 8080;

app.listen(process.env.PORT || port, () => console.log('API succesfully running'));

routes(app);

module.exports = app;
