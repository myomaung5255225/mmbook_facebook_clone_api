import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcrypt";

// signup
interface signupData {
  email: String;
  password: String;
}

export const signup = async (
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
    const hash_password = bcrypt.hashSync(req.body.password, 12);
    const userData: signupData = {
      email: req.body.email,
      password: hash_password,
    };
    const user = new User(userData);
    const result: any = await user.save();
    if (result) {
      const token = jwt.sign(
        { userId: result.id },
        process.env.SECRET || "secret",
        { expiresIn: "1d" }
      );
      res.status(201).json({
        Data: result.email,
        message: "success",
        status: 1,
        access_token: token,
      });
    } else {
      const error: any = new Error("User Register fail");
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

// signin
export const signin = async (
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
    const user: any = await User.findOne({ email: req.body.email });
    if (user) {
      const check_password = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (check_password) {
        const token = jwt.sign(
          { userId: user.id },
          process.env.SECRET || "secret",
          { expiresIn: "1d" }
        );
        res.status(200).json({
          Data: user.email,
          message: "success",
          status: 1,
          access_token: token,
        });
      } else {
        const error: any = new Error("Password not match!");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error("User does not exist!");
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

// get profile

export const profile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user: any = await User.findById(req.userId);
    if (user) {
      res.status(200).json({
        Data: user,
        message: "success",
        status: 1,
      });
    } else {
      const error: any = new Error("User does not Found!");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// update profile

export const updateprofile = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }
    const user: any = await User.findById(req.userId);
    if (user) {
      user.profile.fullname = req.body.fullname;
      user.profile.address = req.body.address;
      user.profile.city = req.body.city;
      user.profile.country = req.body.country;
      const result = await user.save();
      if (result) {
        res.status(201).json({
          Data: result,
          status: 1,
          message: "success",
        });
      } else {
        const error: any = new Error("something wrong!");
        error.statusCode = 422;
        throw error;
      }
    } else {
      const error: any = new Error("User does not exist!");
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

export const update_avatar = async (
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
    const user: any = await User.findById(req.userId);
    if (user) {
      if (req.file) {
        user.avatar = req.headers.host + "/" + req.file.path;

        const result = await user.save();
        if (result) {
          res.status(201).json({
            Data: result,
            status: 1,
            message: "success",
          });
        } else {
          const error: any = new Error("something wrong!");
          error.statusCode = 404;
          throw error;
        }
      } else {
        const error: any = new Error("please select file!");
        error.statusCode = 404;
        throw error;
      }
    } else {
      const error: any = new Error("User does not found!");
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

export const delete_user = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findByIdAndDelete(req.userId);
    if (user) {
      res.status(200).json({
        message: `${user.profile.fullname} is successfully deleted.`,
        status: 1,
      });
    } else {
      const error: any = new Error("User does not found!");
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
