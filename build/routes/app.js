"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createShortUrl_controller_1 = require("../controller/createShortUrl.controller");
const redirect_controller_1 = require("../controller/redirect.controller");
const getAllUrl_controller_1 = require("../controller/getAllUrl.controller");
const getOneUrl_controller_1 = require("../controller/getOneUrl.controller");
const genQrCode_controller_1 = require("../controller/genQrCode.controller");
const customShortUrl_controller_1 = require("../controller/customShortUrl.controller");
const rateLimiting_1 = __importDefault(require("../middleware/rateLimiting"));
function routes(app) {
    app.get("/test", (req, res) => {
        return res.send("App is okay");
    });
    app.post("/shorten", createShortUrl_controller_1.shortenUrl);
    app.get("/:url", redirect_controller_1.redirectURL);
    app.get("/geturls", rateLimiting_1.default, getAllUrl_controller_1.getAllUrl);
    app.get("/analytics/:shortUrl", getOneUrl_controller_1.getOneUrl);
    app.get("/qrcode/:shortUrl", genQrCode_controller_1.generateQrCode);
    app.put("/customurl/:shortUrl", customShortUrl_controller_1.customShortUrl);
    // Error handling 
    app.use((err, req, res, next) => {
        console.error('Rate limiting error:', err);
        res.status(429).json({ error: 'Too many requests, please try again later.' });
    });
}
exports.default = routes;
