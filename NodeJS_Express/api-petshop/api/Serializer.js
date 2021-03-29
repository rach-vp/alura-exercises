const ContentNotSupported = require('./error/ContentNotSupported');

class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  serialize(data) {
    if (this.contentType === 'application/json') {
      return this.json(data);
    }
    throw new ContentNotSupported(this.contentType);
  }
}

module.exports = Serializer;
