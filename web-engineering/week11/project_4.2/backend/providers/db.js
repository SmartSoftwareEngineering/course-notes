import { connect } from "mongoose";
import { config } from "dotenv";

// Run dotenv config to setup environment variables based on .env file
config();

connect(`${process.env.MONGO_URI}`)
  .then(() => console.log("Monngodb Connected"))
  .catch(err => console.log(err))
