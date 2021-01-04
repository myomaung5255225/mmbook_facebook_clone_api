import { Router } from "express";
import { body } from "express-validator";
import {
  create_post,
  delete_post,
  get_allposts,
  get_post,
  updatePost,
} from "../controllers/Post";
import isAuth from "../middleware/isAuth";

const router = Router();
router.get("/allposts", get_allposts);
router.get("/post/:id", get_post);
router.post(
  "/create_post",
  isAuth,
  [body("description").notEmpty().withMessage("Post body required")],
  create_post
);
router.put(
  "/editpost",
  isAuth,
  [body("id").notEmpty().withMessage("Post id required")],
  updatePost
);
router.delete(
  "/delete_post",
  isAuth,
  [body("id").notEmpty().withMessage("Post id required")],
  delete_post
);

export default router;
