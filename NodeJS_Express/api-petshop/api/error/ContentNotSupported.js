class ContentNotSupported extends Error {
  constructor(contentType) {
    super(`Content type ${contentType} not supported`);
    this.name = 'ContentNotSupported';
    this.idError = 3;
  }
}

module.exports = ContentNotSupported;
