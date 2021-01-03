"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
var db = process.env.DB || '';
var port = process.env.PORT || 4000;
var app = express_1.default();
mongoose_1.default.connect(db, { useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    app.listen(port, function () {
        console.log("Server is running at port " + port + ".");
    });
})
    .catch(function (err) {
    console.log(err);
});
//# sourceMappingURL=app.js.map