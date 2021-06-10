const ContentNotSupported = require('./error/ContentNotSupported');
const jsonToXML = require('jsontoxml');

class Serializer {
  json(data) {
    return JSON.stringify(data);
  }

  xml(data) {
    return  Array.isArray(data)
      ? jsonToXML({ [`${this.tag}s`]: data.map((item) => ({ [this.tag]: item })) })
      : jsonToXML({ [this.tag]: data });
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
    if (this.contentType === 'application/xml') {
      return this.xml(filteredData);s
    }
    throw new ContentNotSupported(this.contentType);
  }
}

class ProvidersSerializer extends Serializer {
  constructor(contentType, extraFields) {
    super();
    this.contentType = contentType;
    this.publicFields = ['id', 'provider', 'category'].concat(extraFields || []);
    this.tag = 'provider';
  }
}

class ProductsSerializer extends Serializer {
  constructor(contentType, extraFields) {
    super();
    this.contentType = contentType;
    this.publicFields = ['id', 'title'].concat(extraFields || []);
    this.tag = 'product';
  }
}

class ErrorSerializer extends Serializer {
  constructor(contentType, extraFields) {
    super();
    this.contentType = contentType;
    this.publicFields = ['id', 'message'].concat(extraFields || []);
    this.tag = 'error';
  }
}

module.exports = {
  Serializer,
  ProvidersSerializer,
  ProductsSerializer,
  ErrorSerializer,
  acceptedFormats: ['application/json', 'application/xml'],
};
