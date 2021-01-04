import { Router } from "express";
import { body } from "express-validator";
import {
  profile,
  signin,
  signup,
  update_avatar,
  updateprofile,
  delete_user,
} from "../controllers/user";
import isAuth from "../middleware/isAuth";
import User from "../models/user";
const router = Router();
router.post(
  "/signin",
  [
    body("email")
      .notEmpty()
      .trim()
      .normalizeEmail()
      .isEmail()
      .custom(async (v: any) => {
        return User.findOne({ email: v })
          .then((user) => {
            if (!user) {
              return Promise.reject("User does not exist!");
            } else {
              return Promise.resolve();
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }),
    body("password")
      .notEmpty()
      .isStrongPassword()
      .withMessage("Password must not be empty"),
  ],
  signin
);
router.post(
  "/signup",
  [
    body("email")
      .notEmpty()
      .trim()
      .normalizeEmail()
      .isEmail()
      .custom(async (v: any) => {
        return User.findOne({ email: v })
          .then((user) => {
            if (user) {
              return Promise.reject("User email is already used!");
            } else {
              return Promise.resolve();
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }),
    body("password")
      .notEmpty()
      .isStrongPassword()
      .withMessage("Password must not be empty"),
  ],
  signup
);

router.get("/profile", isAuth, profile);
router.put(
  "/updateprofile",
  isAuth,
  [
    body("fullname").notEmpty().withMessage("full name must not be empty!"),
    body("address").notEmpty().withMessage("Address must not be empty!"),
    body("city").notEmpty().withMessage("City must not be empty!"),
    body("country").notEmpty().withMessage("Country must not be empty!"),
  ],
  updateprofile
);
router.put("/updateavatar", isAuth, update_avatar);
router.delete("/delete_user", isAuth, delete_user);
export default router;
