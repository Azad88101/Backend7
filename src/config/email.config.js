import nodemailer from "nodemailer";

import { configDotenv } from "dotenv";
configDotenv();

export const transporter = nodemailer.createTransport(
   // console.log(process.env.GMAIL, process.env.GMAIL_PASSWORD),
   {
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
         // user: "publicservices.otp@gmail.com",
         // pass: "deny jiix ioie xhkn",
         user: process.env.GMAIL,
         pass: process.env.GMAIL_PASSWORD,
      },
   }
);
