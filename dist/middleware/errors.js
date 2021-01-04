"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(error, _req, res, next) {
    var data = error.data, message = error.message;
    var statusCode = error.statusCode || 500;
    res.status(statusCode).json({ data: data, message: message });
    next();
}
exports.default = default_1;
//# sourceMappingURL=errors.js.map