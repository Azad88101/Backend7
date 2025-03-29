import { v2 as cloudinary } from "cloudinary";

import fs from "fs";

// cloudinary.config({
//    cloud_name: process.env.CLOUD_NAME,
//    api_key: process.env.CLOUD_API_KEY,
//    api_secret: process.env.CLOUD_API_SECRET,
// });

cloudinary.config({
   cloud_name: "azad88101",
   api_key: "743253999311512",
   api_secret: "79VfrI6GKOea1sKQStaXTOz4yiY", // Click 'View API Keys' above to copy your API secret
});

// cloudinary.config({
//    cloud_name: String(process.env.CLOUD_NAME),
//    api_key: String(process.env.CLOUD_API_KEY),
//    api_secret: String(process.env.CLOUD_API_SECRET),
// });

const uploadOnCloud = async (localFilePath) => {
   try {
      if (!localFilePath) return "bhai file path me gadbadi aa rhi h";

      const res = await cloudinary.uploader.upload(localFilePath, {
         resource_type: "auto",
      });

      /// file upload ho gyi hash
      console.log(" uploaded file dekho ", res);
      fs.unlinkSync(localFilePath);

      return res;
   } catch (error) {
      console.log(
         process.env.CLOUD_NAME,
         "  ",
         process.env.CLOUD_API_KEY,
         "  ",
         process.env.CLOUD_API_SECRET
      );
      console.error("❌ Cloudinary upload failed:", error);
      fs.unlinkSync(localFilePath);

      return null;
   }
};

// Transform the image: auto-crop to square aspect_ratio
// const autoCropUrl = cloudinary.url("shoes", {
//    crop: "auto",
//    gravity: "auto",
//    width: 500,
//    height: 500,
// });

// console.log(autoCropUrl);

export default uploadOnCloud;

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs/promises";
// import dotenv from "dotenv";

// // dotenv.config(); // Ensure environment variables are loaded

// // Cloudinary Configuration
// cloudinary.config({
//    cloud_name: process.env.CLOUD_NAME,
//    api_key: process.env.CLOUD_API_KEY,
//    api_secret: process.env.CLOUD_API_SECRET,
// });

// const uploadOnCloud = async (localFilePath) => {
//    try {
//       if (!localFilePath)
//          throw new Error("File path is missing. Cannot upload.");

//       const res = await cloudinary.uploader.upload(localFilePath, {
//          resource_type: "auto",
//       });

//       console.log("✅ File uploaded successfully:", res.secure_url);
//       return { success: true, data: res };
//    } catch (error) {
//       console.error("❌ Cloudinary upload failed:", error.message || error);

//       // Ensure the file exists before deleting
//       if (localFilePath) {
//          try {
//             await fs.unlink(localFilePath);
//          } catch (err) {
//             console.error("⚠️ Failed to delete local file:", err.message);
//          }
//       }

//       return {
//          success: false,
//          message: error.message || "Upload failed",
//          error,
//       };
//    }
// };

// export default uploadOnCloud ;
