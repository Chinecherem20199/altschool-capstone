"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createShortUrl_controller_1 = require("../controller/createShortUrl.controller");
// import { shortenUrl } from "../controller/createShortUrl.controller";
const redirect_controller_1 = require("../controller/redirect.controller");
const genQrCode_controller_1 = require("../controller/genQrCode.controller");
const customShortUrl_controller_1 = require("../controller/customShortUrl.controller");
const getUserUrls_controller_1 = require("../controller/getUserUrls.controller");
const createUserUrl_controller_1 = require("../controller/createUserUrl.controller");
const passport_1 = __importDefault(require("passport"));
function routes(app) {
    app.get("/test", (req, res) => {
        return res.send("Welcome to Capstone Project");
    });
    //Shorten Url for Unprottected
    app.post("/api/shorten", createShortUrl_controller_1.shortenUrl);
    //A user to have a unique url
    app.post("/api/shortenurl", passport_1.default.authenticate("jwt", { session: false }), createUserUrl_controller_1.createUserUrl);
    app.get("/:url", redirect_controller_1.redirectURL);
    app.post("/api/qrcode", passport_1.default.authenticate("jwt", { session: false }), genQrCode_controller_1.generateQrCode);
    app.put("/customurl/:shortId", passport_1.default.authenticate("jwt", { session: false }), customShortUrl_controller_1.customShortUrl);
    app.get("/api/getallurls", passport_1.default.authenticate("jwt", { session: false }), getUserUrls_controller_1.getUserURLs);
    // Route for serving the HTML file
    app.get('/', (req, res) => {
        return res.send("Welcome to Shortnenly URL Shortner");
        // const indexPath = path.join(__dirname, '../../public/index.html');
        // res.sendFile(indexPath);
    });
    // Error handling
    // app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //   console.error("Rate limiting error:", err);
    //   res
    //     .status(429)
    //     .json({ error: "Too many requests, please try again later." });
    // });
}
exports.default = routes;
