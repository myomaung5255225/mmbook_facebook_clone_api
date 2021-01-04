"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_post = exports.updatePost = exports.create_post = exports.get_post = exports.get_allposts = void 0;
var user_1 = __importDefault(require("../models/user"));
var express_validator_1 = require("express-validator");
var post_1 = __importDefault(require("../models/post"));
// get all posts
var get_allposts = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, error, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, post_1.default.find().populate(["comments", "user.profile"])];
            case 1:
                posts = _a.sent();
                if (posts) {
                    res.status(200).json({
                        Data: posts,
                        message: "success",
                        status: 1,
                    });
                }
                else {
                    error = new Error("Posts does not Exists!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (!error_1.statusCode) {
                    error_1.statusCode = 500;
                }
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.get_allposts = get_allposts;
// get post
var get_post = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var post, error;
    return __generator(this, function (_a) {
        try {
            post = post_1.default.findById(req.params.id).populate([
                "comments",
                "user.profile",
            ]);
            if (post) {
                res.status(200).json({
                    Data: post,
                    message: "success",
                    status: 1,
                });
            }
            else {
                error = new Error("Post does not Exists!");
                error.statusCode = 404;
                throw error;
            }
        }
        catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
        return [2 /*return*/];
    });
}); };
exports.get_post = get_post;
var create_post = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, post_data, post, result, user, final_result, error, error, error, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("validation failed");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                post_data = {
                    body: req.body.description,
                    user: req.userId,
                    image: req.file.path,
                };
                post = new post_1.default(post_data);
                return [4 /*yield*/, post.save()];
            case 1:
                result = _a.sent();
                if (!result) return [3 /*break*/, 6];
                return [4 /*yield*/, user_1.default.findById(req.userId)];
            case 2:
                user = _a.sent();
                if (!user) return [3 /*break*/, 4];
                user.post.push(post.id);
                return [4 /*yield*/, user.save()];
            case 3:
                final_result = _a.sent();
                if (final_result) {
                    res.status(201).json({
                        Data: result,
                        message: "Post create successfully",
                        status: 1,
                    });
                }
                else {
                    error = new Error("User does not found!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 5];
            case 4:
                error = new Error("User does not found!");
                error.statusCode = 404;
                throw error;
            case 5: return [3 /*break*/, 7];
            case 6:
                error = new Error("Post create fail!");
                error.statusCode = 404;
                throw error;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                if (!error_2.statusCode) {
                    error_2.statusCode = 500;
                }
                next(error_2);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.create_post = create_post;
// edit post
var updatePost = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, post, result, result_1, error, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("validation failed");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, post_1.default.findById(req.body.id)];
            case 1:
                post = _a.sent();
                if (!post) return [3 /*break*/, 6];
                if (!req.file) return [3 /*break*/, 5];
                post.body = req.body.description;
                post.image = req.file.path;
                return [4 /*yield*/, post.save()];
            case 2:
                result = _a.sent();
                if (!result) return [3 /*break*/, 3];
                res.status(200).json({
                    Data: result,
                    message: "Post updated successfully!",
                    status: 1,
                });
                return [3 /*break*/, 5];
            case 3:
                post.body = req.body.description;
                return [4 /*yield*/, post.save()];
            case 4:
                result_1 = _a.sent();
                if (result_1) {
                    res.status(200).json({
                        Data: result_1,
                        message: "Post updated successfully!",
                        status: 1,
                    });
                }
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error = new Error("Post does not found!");
                error.statusCode = 404;
                throw error;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_3 = _a.sent();
                if (!error_3.statusCode) {
                    error_3.statusCode = 500;
                    throw error_3;
                }
                next(error_3);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.updatePost = updatePost;
// delete post
var delete_post = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, post, error, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("validation failed");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, post_1.default.findByIdAndDelete(req.body.id)];
            case 1:
                post = _a.sent();
                if (post) {
                    if (post) {
                        res.status(200).json({
                            Data: post.id,
                            message: "Post deleted successfully!",
                            status: 1,
                        });
                    }
                }
                else {
                    error = new Error("Post does not found!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                if (!error_4.statusCode) {
                    error_4.statusCode = 500;
                    throw error_4;
                }
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.delete_post = delete_post;
//# sourceMappingURL=Post.js.map