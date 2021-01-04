import { Router } from "express";
import { body } from "express-validator";
import {
  create_comment,
  delete_comment,
  update_comment,
} from "../controllers/comment";
import isAuth from "../middleware/isAuth";
const router = Router();
router.post(
  "/comment_create",
  isAuth,
  [
    body("description")
      .notEmpty()
      .withMessage("Comment text must not be empty!"),
    body("post_id").notEmpty().withMessage("PostId required"),
  ],
  create_comment
);
router.put(
  "/edit_comment",
  isAuth,
  [
    body("description")
      .notEmpty()
      .withMessage("Comment text must not be empty!"),
    body("id").notEmpty().withMessage("Comment Id required"),
  ],
  update_comment
);
router.delete(
  "/delete_comment",
  isAuth,
  [body("id").notEmpty().withMessage("Comment Id required")],
  delete_comment
);

export default router;
