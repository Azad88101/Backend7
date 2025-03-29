// require("dotenv").config();
// console.log(process.env);

import { app } from "./app.js";
import DB_Connection from "./db/DB_Connection.js";

import dotenv from "dotenv";

dotenv.config();


DB_Connection()
   .then(() => {
      console.log(" data base ho gya ");
      app.listen(process.env.PORT || 8000, () => {
         console.log(`server runing on port ${process.env.PORT}`);
      });
   })
   .catch((err) => {
      console.log(err , "data base connect bhinhi huys");
   });
