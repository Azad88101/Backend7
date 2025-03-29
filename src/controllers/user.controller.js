// get user detaiils from front end  ✔
//validataionsss - not empty any field✅
// check user already existing✅
// check for image --  check avatar✅
// /send image to cloudinary get resposnse like url and store this in DB  --  usng multer
// create user object  and cretae entry in db and add all the things
// // remove password and refresh token
// check for user creation nhi too error
// return res

import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "./../utils/asyncHandler.js";
import { User } from "./../models/user.model.js";
import { ApiResponse } from "./../utils/ApiResponse.js";
import upload from "./../utils/cloudinaryService.js";
import { sendVerificationCode, welcomeEmail } from "../middlewares/Email.js";
// import  from './../middlewares/Email.js'

const registerUser = asyncHandler(async (req, res) => {
   const { userName, email, password, fullName } = req.body;
   console.log(" uploaded file dekho ", userName, fullName, email, password);

   if (userName === "") {
      throw new ApiError("user name is required", 400);
   }
   if (fullName === "") {
      throw new ApiError("fullName is required", 400);
   }
   if (email === "") {
      throw new ApiError("email is required", 400);
   }
   if (password === "") {
      throw new ApiError("password is required", 400);
   }

   // if (User.findOne({ email })) {
   //    throw new ApiError(409, "emaill  is alredy prestn use diffrennt");
   // }

   const existedUser = await User.findOne({
      $or: [
         { username: userName.toLowerCase() },
         { email: email.toLowerCase() },
      ],
   });
   // const existedUser = await User.findOne({ username: userName.toLowerCase() });

   console.log("exited user tal aaya hu me", existedUser);

   if (existedUser) {
      throw new ApiError(
         "Email or userName is already in use. Please try a different one.",
         409
      );
   }

   const avatarLocalPath = req.files?.avatar?.[0]?.path;
   const coverLocalPath = req.files?.coverImage?.[0]?.path;

   console.log("local path nbhje rha hu", avatarLocalPath, coverLocalPath);

   if (!avatarLocalPath) {
      throw new ApiError("Avatar file is required", 400);
   }

   const avatarURL = await upload(avatarLocalPath);
   let coverURL = "";
   if (!(coverLocalPath == undefined)) {
      coverURL = await upload(coverLocalPath);
   }

   console.log("urls leoo ", avatarURL, coverURL);

   if (!avatarURL) {
      throw new ApiError("Error while uploading avatar", 400);
   }

   console.log("avatare ke bbaad h ham");

   const VerificationCode = Math.floor(
      100000 + Math.random() * 900000
   ).toString();

   const user = await User.create({
      fullName,
      email,
      username: userName.toLowerCase(),
      password,
      avatar: avatarURL.url,
      coverImage: coverURL?.url || "",
      VerificationCode,
   });

   // const createdUser = await User.findById(user.id).select(

   //    "-password -refreshToken"
   // );

   //    // this select is use for not getiong paswrod  andn refresh token in created user variable
   const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
   );

   console.log("token hatane ke bad");

   if (!createdUser) {
      throw new ApiError("something went wrong while creating a user", 500);
   }

   console.log("created user chek krne kee baaddddddddddd");
   // await user.save();
   // sendVerificationCode(email, VerificationCode);
   return res
      .status(201)
      .json(
         new ApiResponse(
            200,
            createdUser,
            "user created/registered successfully "
         )
      );
});

const verifyEmail = async (req, res) => {
   console.log("ayanw xklcjll nnsjln jlcdjln jdn cj dcjc jcdnk dn n n data");

   try {
      const { code } = req.body;
      console.log("code is : ", code);

      if (!code) {
         throw new ApiError("Verification code is required", 400);
      }

      const user = await User.findOne({ VerificationCode: code });

      if (!user) {
         throw new ApiError("Invalid code or expired", 400);
      }

      if (user.isVerified) {
         throw new ApiError("User is already verified.", 409);
      }

      user.isVerified = true;
      user.VerificationCode = undefined;
      await user.save();
      await welcomeEmail(user.email, user.fullname);
      return res
         .status(200)
         .json({ success: true, message: "Verification successful." });
   } catch (error) {
      console.error("Verification error:", error.message);
      return res
         .status(500)
         .json({ success: false, message: "Internal server error." });
   }
};

export { registerUser, verifyEmail };
