"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var comment_1 = require("../controllers/comment");
var isAuth_1 = __importDefault(require("../middleware/isAuth"));
var router = express_1.Router();
router.post("/comment_create", isAuth_1.default, [
    express_validator_1.body("description")
        .notEmpty()
        .withMessage("Comment text must not be empty!"),
    express_validator_1.body("post_id").notEmpty().withMessage("PostId required"),
], comment_1.create_comment);
router.put("/edit_comment", isAuth_1.default, [
    express_validator_1.body("description")
        .notEmpty()
        .withMessage("Comment text must not be empty!"),
    express_validator_1.body("id").notEmpty().withMessage("Comment Id required"),
], comment_1.update_comment);
router.delete("/delete_comment", isAuth_1.default, [express_validator_1.body("id").notEmpty().withMessage("Comment Id required")], comment_1.delete_comment);
exports.default = router;
//# sourceMappingURL=comment.js.map