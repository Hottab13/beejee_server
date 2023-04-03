module.exports = class ApiErrors extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UnauthorizedError(message) {
    return new ApiErrors(401, message,);
  }
  static BadRequest(message, errors = []) {
    //console.log(message)
   // console.log(errors)
    return new ApiErrors(400, message, errors);
  }
};
