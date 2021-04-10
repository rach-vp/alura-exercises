const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { estrategiasAuthent } = require('./src/usuarios');

app.use(bodyParser.json());

module.exports = app;
