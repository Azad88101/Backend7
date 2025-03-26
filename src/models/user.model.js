import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// const userSchema = mongoose.Schema({
//     id:{

//     }

// },{timestamps:true})

const userSchema = new Schema(
   {
      id: {
         type: Number,
         unique: true,
         required: true,
      },
      username: {
         type: String,
         unique: true,
         required: true,
         lowercase: true,
         trim: true,
         index: true,
      },

      email: {
         type: String,
         unique: true,
         required: true,
         lowercase: true,
         trim: true,
      },
      fullName: {
         type: String,
         required: true,
         trim: true,
         index: true,
      },

      avatar: {
         type: String, /// clodinary we use
         required: true,
      },
      coverImage: {
         type: String, /// clodinary we use
      },

      watchHistory: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
         },
      ],

      password: {
         type: String,
         required: [true, "password is required"],
      },

      // /we will do this after making a function

      refreshToken: {
         type: String,
      },
   },
   { timestamps: true }
);





userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();

   this.password = bcrypt.hash(this.password, 10);

   next();
});





userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
};




userSchema.methods.generateAccessToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         username: this.username,
         fullName: this.fullName,
      },

      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
   );
};

userSchema.methods.generateRefreshToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
      },

      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
   );
};
export const User = mongoose.model("User", userSchema);
