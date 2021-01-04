import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const postSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, "tell your feeling."],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comment",
      },
    ],
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default model("post", postSchema);
