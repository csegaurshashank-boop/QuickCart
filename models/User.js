import { Email } from "@clerk/backend/dist/api";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    _id:{ type : String, required:true},
    name:{ type : String, required:true},
    Email:{ type : String, required:true, unique:true},
    imageUrl : { type : String, required:true},
    cartItems: { type : Object, default: {} }
}, {minimize: false })

const User = mongoose.model.User || mongoose.model('user',userSchema)

export default User