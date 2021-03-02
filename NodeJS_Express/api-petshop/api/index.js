const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./routs/providers');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/providers', router);

const port = process.env.PORT || config.get('api.port');
app.listen(port, () => console.log(`Listening at port ${port}`));
