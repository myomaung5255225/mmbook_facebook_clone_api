"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'require email address!'],
        unique: [true, 'Your email is already used.']
    },
    password: {
        type: String,
        required: [true, 'require password'],
        min: [8, 'min password length is 8 characters.']
    },
    avatar: {
        type: String,
        default: null
    },
    profile: {
        fullname: {
            type: String,
        },
        address: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        post: [
            {
                type: mongoose_2.default.Types.ObjectId,
                ref: 'post'
            }
        ]
    }
}, { timestamps: true });
exports.default = mongoose_1.model('user', userSchema);
//# sourceMappingURL=user.js.map