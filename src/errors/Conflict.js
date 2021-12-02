class Conflict extends Error {
  constructor(message) {
    super(message);
    this.name = 'Conflict';
  }
}

export default Conflict;
