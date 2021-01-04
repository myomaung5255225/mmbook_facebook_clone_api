import express, { Request } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./routes/user";
import errors from "./middleware/errors";
import path from "path";
import { v4 } from "uuid";
import Post from "./routes/post";
import multer, { FileFilterCallback } from "multer";
import Comment from "./routes/comment";
dotenv.config();
const db = process.env.DB || "";
const port = process.env.PORT || 4000;
const app = express();
app.use("/public", express.static(path.join(__dirname, "..", "public")));
app.use("/images", express.static(path.join(__dirname, "..", "images")));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "images");
  },
  filename: (_req, file: any, cb) => {
    cb(null, v4() + "-" + file.originalname);
  },
});
const filter = (_req: Request, file: any, cb: FileFilterCallback) => {
  if (file.mimetype === "image/jpg" || "image/png" || "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage: storage, fileFilter: filter }).single("image"));
mongoose
  .connect(db, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port ${port}.`);
    });
    app.use(express.json());
    app.use("/api/v1/user", User);
    app.use("/api/v1/post", Post);
    app.use("/api/v1/comment", Comment);
    app.use(errors);
  })
  .catch((err) => {
    console.log(err);
  });
