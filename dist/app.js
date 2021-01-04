"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var user_1 = __importDefault(require("./routes/user"));
var errors_1 = __importDefault(require("./middleware/errors"));
var path_1 = __importDefault(require("path"));
var uuid_1 = require("uuid");
var post_1 = __importDefault(require("./routes/post"));
var multer_1 = __importDefault(require("multer"));
var comment_1 = __importDefault(require("./routes/comment"));
require("./models/comment");
require("./models/user");
require("./models/post");
dotenv_1.default.config();
var db = process.env.DB || "";
var port = process.env.PORT || 4000;
var app = express_1.default();
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "..", "images")));
var storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, "images");
    },
    filename: function (_req, file, cb) {
        cb(null, uuid_1.v4() + "-" + file.originalname);
    },
});
var filter = function (_req, file, cb) {
    if (file.mimetype === "image/jpg" || "image/png" || "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use(express_1.default.urlencoded({ extended: true }));
app.use(multer_1.default({ storage: storage, fileFilter: filter }).single("image"));
mongoose_1.default
    .connect(db, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(function () {
    app.listen(port, function () {
        console.log("Server is running at port " + port + ".");
    });
    app.use(express_1.default.json());
    app.use("/api/v1/user", user_1.default);
    app.use("/api/v1/post", post_1.default);
    app.use("/api/v1/comment", comment_1.default);
    app.use(errors_1.default);
})
    .catch(function (err) {
    console.log(err);
});
//# sourceMappingURL=app.js.map