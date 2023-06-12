import mongoose from "mongoose";
import { Schema } from "mongoose";

const newuser = new Schema({

    email: String,
    password: String,
    confirmpassword: String,
    pin: String,
    number: Number,
    address: String,
    pancard: String
});

export default mongoose.model("Users", newuser);