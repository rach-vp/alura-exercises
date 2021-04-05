const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./routs/providers');
const NotFound = require('./error/NotFound');
const InvalidField = require('./error/InvalidField');
const NoUpdatableData = require('./error/NoUpdatableData');
const ContentNotSupported = require('./error/ContentNotSupported');
const { acceptedFormats } = require('./Serializer');
const { ErrorSerializer } = require('./Serializer');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  const requestedFormat = req.header('Accept') === '*/*'
    ? 'application/json'
    : req.header('Accept');
  if (!acceptedFormats.includes(requestedFormat)) {
    return res.status(406).end();
  }
  res.setHeader('Content-Type', requestedFormat);
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/providers', router);

// Custom error handler
app.use((error, req, res, next) => {
  const { idError, message } = error;
  let status;
  switch(error.constructor) {
    case NotFound:
      status = 404;
      break;
    case InvalidField:
    case NoUpdatableData:
      status = 400;
      break;
    case ContentNotSupported:
      status = 406;
      break;
    default:
      status = 500;
      break;
  }
  const serializer = new ErrorSerializer(res.getHeader('Content-Type'));
  res.status(status).send(serializer.serialize({ id: idError, message }));
});

const port = process.env.PORT || config.get('api.port');
app.listen(port, () => console.log(`Listening at port ${port}`));
