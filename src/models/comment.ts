import { model, Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: [true, "require body"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: "post",
    },
  },
  { timestamps: true }
);

export default model("comment", commentSchema);
