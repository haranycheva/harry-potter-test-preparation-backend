import app from "./app.js"
import mongoose from 'mongoose';

const {DB_HOST} = process.env

mongoose.connect(DB_HOST).then(() => {
  console.log("DB connect")
  app.listen(3015);
}).catch((err) => {
  console.log(err.message); 
  process.exit(1)
})