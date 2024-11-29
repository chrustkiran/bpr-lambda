class NoResultsError extends Error {
    constructor(message, errorCode) {
      super(message);
      this.name = "NoResultsError";
      this.code = errorCode;
    }
  }

  module.exports = NoResultsError