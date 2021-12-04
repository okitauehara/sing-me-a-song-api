class InvalidValue extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidValue';
  }
}

export default InvalidValue;
