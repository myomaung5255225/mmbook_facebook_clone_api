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
exports.delete_user = exports.update_avatar = exports.updateprofile = exports.profile = exports.signin = exports.signup = void 0;
var express_validator_1 = require("express-validator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = __importDefault(require("../models/user"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var signup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, hash_password, userData, user, result, token, error, error_1;
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
                hash_password = bcrypt_1.default.hashSync(req.body.password, 12);
                userData = {
                    email: req.body.email,
                    password: hash_password,
                };
                user = new user_1.default(userData);
                return [4 /*yield*/, user.save()];
            case 1:
                result = _a.sent();
                if (result) {
                    token = jsonwebtoken_1.default.sign({ userId: result.id }, process.env.SECRET || "secret", { expiresIn: "1d" });
                    res.status(201).json({
                        Data: result.email,
                        message: "success",
                        status: 1,
                        access_token: token,
                    });
                }
                else {
                    error = new Error("User Register fail");
                    error.statusCode = 422;
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
exports.signup = signup;
// signin
var signin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, user, check_password, token, error, error, error_2;
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
                return [4 /*yield*/, user_1.default.findOne({ email: req.body.email })];
            case 1:
                user = _a.sent();
                if (user) {
                    check_password = bcrypt_1.default.compareSync(req.body.password, user.password);
                    if (check_password) {
                        token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.SECRET || "secret", { expiresIn: "1d" });
                        res.status(200).json({
                            Data: user.email,
                            message: "success",
                            status: 1,
                            access_token: token,
                        });
                    }
                    else {
                        error = new Error("Password not match!");
                        error.statusCode = 404;
                        throw error;
                    }
                }
                else {
                    error = new Error("User does not exist!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (!error_2.statusCode) {
                    error_2.statusCode = 500;
                }
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.signin = signin;
// get profile
var profile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.default.findById(req.userId)];
            case 1:
                user = _a.sent();
                if (user) {
                    res.status(200).json({
                        Data: user,
                        message: "success",
                        status: 1,
                    });
                }
                else {
                    error = new Error("User does not Found!");
                    error.statusCode = 401;
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
exports.profile = profile;
// update profile
var updateprofile = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, user, result, error, error, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("Validation failed!");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, user_1.default.findById(req.userId)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.profile.fullname = req.body.fullname;
                user.profile.address = req.body.address;
                user.profile.city = req.body.city;
                user.profile.country = req.body.country;
                return [4 /*yield*/, user.save()];
            case 2:
                result = _a.sent();
                if (result) {
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "success",
                    });
                }
                else {
                    error = new Error("something wrong!");
                    error.statusCode = 422;
                    throw error;
                }
                return [3 /*break*/, 4];
            case 3:
                error = new Error("User does not exist!");
                error.statusCode = 404;
                throw error;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                if (!error_4.statusCode) {
                    error_4.statusCode = 500;
                }
                next(error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateprofile = updateprofile;
var update_avatar = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, error, user, result, error, error, error, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    error = new Error("validation failed");
                    error.data = errors.array();
                    error.statusCode = 422;
                    throw error;
                }
                return [4 /*yield*/, user_1.default.findById(req.userId)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 5];
                if (!req.file) return [3 /*break*/, 3];
                user.avatar = req.headers.host + "/" + req.file.path;
                return [4 /*yield*/, user.save()];
            case 2:
                result = _a.sent();
                if (result) {
                    res.status(201).json({
                        Data: result,
                        status: 1,
                        message: "success",
                    });
                }
                else {
                    error = new Error("something wrong!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 4];
            case 3:
                error = new Error("please select file!");
                error.statusCode = 404;
                throw error;
            case 4: return [3 /*break*/, 6];
            case 5:
                error = new Error("User does not found!");
                error.statusCode = 404;
                throw error;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_5 = _a.sent();
                if (!error_5.statusCode) {
                    error_5.statusCode = 500;
                }
                next(error_5);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.update_avatar = update_avatar;
var delete_user = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.default.findByIdAndDelete(req.userId)];
            case 1:
                user = _a.sent();
                if (user) {
                    res.status(200).json({
                        message: user.profile.fullname + " is successfully deleted.",
                        status: 1,
                    });
                }
                else {
                    error = new Error("User does not found!");
                    error.statusCode = 404;
                    throw error;
                }
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                if (!error_6.statusCode) {
                    error_6.statusCode = 500;
                }
                next(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.delete_user = delete_user;
//# sourceMappingURL=user.js.map