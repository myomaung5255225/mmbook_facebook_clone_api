"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var postSchema = new mongoose_1.Schema({
    body: {
        type: String,
        required: [true, 'tell your feeling.']
    },
    user: {
        type: mongoose_2.default.Types.ObjectId,
        ref: 'user'
    },
    comments: [
        {
            type: mongoose_2.default.Types.ObjectId,
            ref: 'comment'
        }
    ]
}, { timestamps: true });
exports.default = mongoose_1.model('post', postSchema);
//# sourceMappingURL=post.js.map