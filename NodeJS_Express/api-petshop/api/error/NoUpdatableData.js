class NoUpdatableData extends Error {
  constructor() {
    super('No updatable data provided');
    this.name = 'NoUpdatableData';
    this.idError = 2;
  }
}

module.exports = NoUpdatableData;
