const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || config.get(api.port);
app.listen(port, () => console.log(`Listening at port ${port}`));
