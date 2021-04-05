const ContentNotSupported = require('./error/ContentNotSupported');

class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  filterData(data) {
    const filteredData = {};
    this.publicFields.forEach((field) => {
      if (data.hasOwnProperty(field)) filteredData[field] = data[field];
    });
    return filteredData;
  }

  serialize(data) {
    const filteredData = Array.isArray(data)
      ? data.map((item) => this.filterData(item))
      : this.filterData(data);
    if (this.contentType === 'application/json') {
      return this.json(filteredData);
    }
    throw new ContentNotSupported(this.contentType);
  }
}

class ProvidersSerializer extends Serializer {
  constructor(contentType) {
    super();
    this.contentType = contentType;
    this.publicFields = ['id', 'provider', 'category'];
  }
}

module.exports = {
  Serializer,
  ProvidersSerializer,
  acceptedFormats: ['application/json'],
};
