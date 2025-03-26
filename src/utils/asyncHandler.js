//  byutt we use this using promiss

const asyncHandler = (func) => {
   (req, res, next) => {
      Promise.resolve(func(req, res, next)).catch((err) => next(err));
   };
};

export { asyncHandler };

// using tray and catch   its utility function

// const asyncHandler = (fun = async (req, res, next) => {
//    try {
//       await fun();
//    } catch (error) {
//       res.status(error.code || 500, {
//          success: true,
//          massage: error.massage,
//       });
//    }
// });
