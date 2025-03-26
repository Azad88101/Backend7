import mongoose from "mongoose";

const DB_Connection = async () => {
   try {
      const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
      console.log(`MongoDB Connected: ${connection.connection.host}`);
   } catch (error) {
      console.error("MongoDB connection error:", error.message);
      process.exit(1);
   }
};

export default DB_Connection;
