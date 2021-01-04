import { Response, NextFunction } from "express";
import User from "../models/user";
import { validationResult } from "express-validator";
import Post from "../models/post";
interface mypost {
  body: String;
  user: any;
}
export const create_post = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("validation failed");
      error.statusCode = 422;
      throw error;
    }
    const post_data: mypost = {
      body: req.body.description,
      user: req.userId,
    };
    const post = new Post(post_data);
    const result: any = await post.save();
    if (result) {
      const user: any = await User.findById(req.userId);
      if (user) {
        user.post.push(post.id);
        const final_result = await user.save();
        if (final_result) {
          res.status(201).json({
            Data: result,
            message: "Post create successfully",
            status: 1,
          });
        } else {
          const error: any = new Error("User does not found!");
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error: any = new Error("User does not found!");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error("Post create fail!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// edit post
