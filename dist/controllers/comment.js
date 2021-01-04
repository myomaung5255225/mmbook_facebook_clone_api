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
exports.delete_comment = exports.update_comment = exports.create_comment = void 0;
var express_validator_1 = require("express-validator");
var post_1 = __importDefault(require("../models/post"));
var comment_1 = __importDefault(require("../models/comment"));
var create_comment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, post, comment_data, comment, result, error, error, error_1;
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
                return [4 /*yield*/, post_1.default.findById(req.body.post_id)];
            case 1:
                post = _a.sent();
                if (!post) return [3 /*break*/, 6];
                comment_data = {
                    body: req.body.description,
                    user: req.userId,
                    post: req.body.post_id,
                };
                comment = new comment_1.default(comment_data);
                return [4 /*yield*/, comment.save()];
            case 2:
                result = _a.sent();
                if (!result) return [3 /*break*/, 4];
                post.comment.push(result.id);
                return [4 /*yield*/, post.save()];
            case 3:
                _a.sent();
                res.status(201).json({
                    Data: result,
                    message: "comment successfully",
                    status: 1,
                });
                return [3 /*break*/, 5];
            case 4:
                error = new Error("comment fail");
                error.statusCode = 422;
                throw error;
            case 5: return [3 /*break*/, 7];
            case 6:
                error = new Error("Post does not found!");
                error.statusCode = 422;
                throw error;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_1 = _a.sent();
                if (!error_1.statusCode) {
                    error_1.statusCode = 500;
                }
                next(error_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.create_comment = create_comment;
// update comment
var update_comment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, comment, result, error, error, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("validation failed");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, comment_1.default.findById(req.body.id)];
            case 1:
                comment = _a.sent();
                if (!comment) return [3 /*break*/, 3];
                comment.body = req.body.description;
                return [4 /*yield*/, comment.save()];
            case 2:
                result = _a.sent();
                if (result) {
                    res.status(200).json({
                        Data: result,
                        status: 1,
                        message: "comment updated successfully",
                    });
                }
                else {
                    error = new Error("Comment update fail!");
                    error.statusCode = 422;
                    throw error;
                }
                return [3 /*break*/, 4];
            case 3:
                error = new Error("Comment does not found!");
                error.statusCode = 422;
                throw error;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                if (!error_2.statusCode) {
                    error_2.statusCode = 500;
                }
                next(error_2);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.update_comment = update_comment;
// delete
var delete_comment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, comment, error, error_3;
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
                return [4 /*yield*/, comment_1.default.findByIdAndDelete(req.body.comment_id)];
            case 1:
                comment = _a.sent();
                if (comment) {
                    res.status(200).json({
                        Data: comment.id,
                        status: 1,
                        message: "Comment deleted successfully!",
                    });
                }
                else {
                    error = new Error("Post does not found!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                if (!error_3.statusCode) {
                    error_3.statusCode = 500;
                }
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.delete_comment = delete_comment;
//# sourceMappingURL=comment.js.map