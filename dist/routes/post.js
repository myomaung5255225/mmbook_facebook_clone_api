"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var Post_1 = require("../controllers/Post");
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var router = express_1.Router();
router.get("/allposts", Post_1.get_allposts);
router.get("/post/:id", Post_1.get_post);
router.post("/create_post", isAuth_1.default, [express_validator_1.body("description").notEmpty().withMessage("Post body required")], Post_1.create_post);
router.put("/editpost", isAuth_1.default, [express_validator_1.body("id").notEmpty().withMessage("Post id required")], Post_1.updatePost);
router.delete("/delete_post", isAuth_1.default, [express_validator_1.body("id").notEmpty().withMessage("Post id required")], Post_1.delete_post);
exports.default = router;
//# sourceMappingURL=post.js.map