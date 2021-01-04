import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import Post from "../models/post";
import Comment from "../models/comment";
interface comment_body {
  body: String;
  user: any;
  post: any;
}
export const create_comment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const post: any = await Post.findById(req.body.post_id);
    if (post) {
      const comment_data: comment_body = {
        body: req.body.description,
        user: req.userId,
        post: req.body.post_id,
      };
      const comment = new Comment(comment_data);
      const result = await comment.save();
      if (result) {
        post.comment.push(result.id);

        await post.save();
        res.status(201).json({
          Data: result,
          message: "comment successfully",
          status: 1,
        });
      } else {
        const error: any = new Error("comment fail");
        error.statusCode = 422;
        throw error;
      }
    } else {
      const error: any = new Error("Post does not found!");
      error.statusCode = 422;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
// update comment
export const update_comment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const comment: any = await Comment.findById(req.body.id);
    if (comment) {
      comment.body = req.body.description;
      const result = await comment.save();
      if (result) {
        res.status(200).json({
          Data: result,
          status: 1,
          message: "comment updated successfully",
        });
      } else {
        const error: any = new Error("Comment update fail!");
        error.statusCode = 422;
        throw error;
      }
    } else {
      const error: any = new Error("Comment does not found!");
      error.statusCode = 422;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// delete

export const delete_comment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const comment = await Comment.findByIdAndDelete(req.body.comment_id);
    if (comment) {
      res.status(200).json({
        Data: comment.id,
        status: 1,
        message: "Comment deleted successfully!",
      });
    } else {
      const error: any = new Error("Post does not found!");
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
