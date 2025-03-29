import express, { Router } from "express";
import { registerUser, verifyEmail } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

// router.post(
//    "/register",
// / /  // // /  //  / // its mddleware
//    upload.fields([
//       { name: "avatar", maxCount: 1 },
//       { backGroundImage: "coverImage", maxCount: 1 },
//    ]),

//    registerUser
// );

// router.post(
//    "/reg",
//    upload.fields([
//       { name: "avatar", maxCount: 1 },
//       { name: "coverImage", maxCount: 1 },
//    ]),
//    registerUser
// );

router.route("/reg").post(
   // this partt
   upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "coverImage", maxCount: 1 },
   ]),
   // its a middle ware come in mid of the controller

   registerUser
);

router.route("/verify").post(verifyEmail);
router.route("/login").post(login);

export default router;
