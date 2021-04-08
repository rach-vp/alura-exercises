const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
  res.status(200).send({ message: 'API on '});
});

app.listen(process.env.PORT || port, () => console.log('API succesfully running'));
