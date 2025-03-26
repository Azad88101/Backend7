// error calss given by nodejs and req, res is maintinad by express

class ApiError extends Error {
   constructor(
      massage = "something went wrong ",
      statusCode,
      errors = [],
      stack = ""
   ) {
      super(massage);
      (this.statusCode = statusCode),
         (this.errors = errors),
         (this.stack = stack),
         (this.success = false),
         (this.data = null);
   }
}
