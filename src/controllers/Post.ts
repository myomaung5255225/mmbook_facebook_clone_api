import { Response, NextFunction, Request } from "express";
import User from "../models/user";
import { validationResult } from "express-validator";
import Post from "../models/post";

// get all posts

export const get_allposts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find().populate(["comments", "user.profile"]);
    if (posts) {
      res.status(200).json({
        Data: posts,
        message: "success",
        status: 1,
      });
    } else {
      const error: any = new Error("Posts does not Exists!");
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
interface mypost {
  body: String;
  user: any;
  image: String;
}

// get post

export const get_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post: any = Post.findById(req.params.id).populate([
      "comments",
      "user.profile",
    ]);
    if (post) {
      res.status(200).json({
        Data: post,
        message: "success",
        status: 1,
      });
    } else {
      const error: any = new Error("Post does not Exists!");
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

export const create_post = async (
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
    const post_data: mypost = {
      body: req.body.description,
      user: req.userId,
      image: req.file.path,
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

export const updatePost = async (
  req: Request,
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
    const post = await Post.findById(req.body.id);
    if (post) {
      if (req.file) {
        post.body = req.body.description;
        post.image = req.file.path;
        const result = await post.save();
        if (result) {
          res.status(200).json({
            Data: result,
            message: "Post updated successfully!",
            status: 1,
          });
        } else {
          post.body = req.body.description;
          const result = await post.save();
          if (result) {
            res.status(200).json({
              Data: result,
              message: "Post updated successfully!",
              status: 1,
            });
          }
        }
      }
    } else {
      const error: any = new Error("Post does not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      throw error;
    }
    next(error);
  }
};

// delete post

export const delete_post = async (
  req: Request,
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
    const post = await Post.findByIdAndDelete(req.body.id);
    if (post) {
      if (post) {
        res.status(200).json({
          Data: post.id,
          message: "Post deleted successfully!",
          status: 1,
        });
      }
    } else {
      const error: any = new Error("Post does not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      throw error;
    }
    next(error);
  }
};
