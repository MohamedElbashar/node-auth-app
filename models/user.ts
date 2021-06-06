/** @format */

import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minLength: [6, "minimum password length is 6 character"],
  },
});

//fire a function before doc saved to db
userSchema.pre("save", async (next) => {
  const salt = await bcrypt.genSalt(10);
  (this as any).password = await bcrypt.hash((this as any).password, salt);
  next();
});

//fire a function after doc saved to db
// userSchema.post("save", (doc: any, next: any) => {
//   console.log("new user was created and saved", doc);
//   next();
// });

const user = mongoose.model("user", userSchema);
export default user;
