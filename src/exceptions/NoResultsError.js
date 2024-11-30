module.exports = class NoResultsError extends Error {
    constructor(message) {
      super(message);
      this.name = "NoResultsError";
      this.statusCode = 404;
    }
  }