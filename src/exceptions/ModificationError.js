module.exports = class ModificationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ModificationError";
        this.statusCode = 400;
      }
}