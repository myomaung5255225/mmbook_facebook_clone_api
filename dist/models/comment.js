"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var commentSchema = new mongoose_1.Schema({
    body: {
        type: String,
        required: [true, "require body"],
    },
    user: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "user",
    },
    post: {
        type: mongoose_2.default.Types.ObjectId,
        ref: "post",
    },
}, { timestamps: true });
exports.default = mongoose_1.model("comment", commentSchema);
//# sourceMappingURL=comment.js.map