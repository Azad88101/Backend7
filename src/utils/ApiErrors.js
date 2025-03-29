class ApiError extends Error {
   constructor(
      message = "Something went wrong", // Default error message
      statusCode = 500, // Default HTTP status code
      errors = [], // Additional validation errors (if any)
      stack = "" // Stack trace
   ) {
      super(message); // Call the parent Error class constructor
      this.name = this.constructor.name; // Set error class name
      this.statusCode = statusCode;
      this.errors = Array.isArray(errors) ? errors : [errors]; // Ensure errors is an array
      this.success = false;
      this.data = null;

      // If stack is not provided, capture it automatically
      if (!stack) {
         Error.captureStackTrace(this, this.constructor);
      } else {
         this.stack = stack;
      }
   }
}

export { ApiError };
