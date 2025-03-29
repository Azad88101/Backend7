import { transporter } from "./../config/email.config.js";
import { Reset_Password_Email_Template, Update_Password_Email_Template, Verification_Email_Template ,Welcome_Email_Template } from "./Email.template.js";
// import { verificationMailDemo } from "./EmailTemplateDemo.js";

export const sendVerificationCode = async (email, VerificationCode) => {
  try {
    const response = await transporter.sendMail({
       from: '"Public Services " <publicservices.otp@gmail.com>', // sender address
       to: email, // list of receivers
       subject: "Verify your email", // Subject line
       text: "verify your email", // plain text body
       html: Verification_Email_Template.replace(
          "{verificationCode}",
          VerificationCode
       ),
       //   html: personalizedEmailContent, // html body
    });

    console.log("email send successfully");
  } catch (error) {
    console.log("emal error", error);
  }
};

export const welcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
       from: '"Public Services " <publicservices.otp@gmail.com>', // sender address
       to: email, // list of receivers
       subject: "Verify your email", // Subject line
       text: "verify your email", // plain text body
       html: Welcome_Email_Template.replace("{name}", name),
       //   html: personalizedEmailContent, // html body
    });

    console.log("emal send succes fully", response);
  } catch (error) {
    console.log("emal error", error);
  }
};


export const resetEmail = async (email, verificationCode, name) => {
  try {
    const response = await transporter.sendMail({
       from: '"Public Services " <publicservices.otp@gmail.com>', // sender address
       to: email, // list of receivers
       subject: "Reset your password at Sarvagya Nirakar Community", // Subject line
       text: "Reset your password at Sarvagya Nirakar Community", // plain text body
       html: Reset_Password_Email_Template.replace(
          "{verificationCode}",
          verificationCode
       ) // Replace the verification code
          .replace("{name}", name), // Replace the name
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.log("Email error", error);
  }
};


export const Updatepassword = async (email, name) => {
  try {
    const response = await transporter.sendMail({
       from: '"Public Services" <publicservices.otp@gmail.com>', // sender address
       to: email, // list of receivers
       subject: "Password Updated Successfully", // Subject line
       text: "Password Updated Successfully", // plain text body
       html: Update_Password_Email_Template.replace("{name}", name),
       //   html: personalizedEmailContent, // html body
    });

    console.log("email send succesfully", response);
  } catch (error) {
    console.log("email error", error);
  }
};
