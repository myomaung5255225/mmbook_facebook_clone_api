"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, _res, next) {
    try {
        var authHeader = req.get("Authorization");
        if (authHeader) {
            var token = authHeader.split(" ")[1];
            var decoded_token = jsonwebtoken_1.default.verify(token, process.env.SECRET || "secret");
            if (decoded_token) {
                req.userId = decoded_token.userId;
                next();
            }
            else {
                var error = new Error("Unauthorized User!");
                error.statusCode = 401;
                throw error;
            }
        }
        else {
            var error = new Error("Unauthorized User!");
            error.statusCode = 401;
            throw error;
        }
    }
    catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
exports.default = default_1;
//# sourceMappingURL=isAuth.js.map