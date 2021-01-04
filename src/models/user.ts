import { model, Schema } from "mongoose";
import mongoose from "mongoose";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "require email address!"],
      unique: [true, "Your email is already used."],
    },
    password: {
      type: String,
      required: [true, "require password"],
      min: [8, "min password length is 8 characters."],
    },
    avatar: {
      type: String,
      default: null,
    },
    profile: {
      fullname: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    post: [
      {
        type: mongoose.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  { timestamps: true }
);

export default model("user", userSchema);
