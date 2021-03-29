const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./routs/providers');
const NotFound = require('./error/NotFound');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/providers', router);

app.use((error, req, res, next) => {
  const { idError, message } = error;
  if (error instanceof NotFound) {
    res.status(404).send(JSON.stringify({ idError, message }));
  } else {
    res.status(400).send(JSON.stringify({ idError, message }));
  }
});

const port = process.env.PORT || config.get('api.port');
app.listen(port, () => console.log(`Listening at port ${port}`));
