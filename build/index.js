"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config/config");
const app_1 = __importDefault(require("./routes/app"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
const PORT = config_1.config.server.port;
app.use(express_1.default.json());
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
    (0, app_1.default)(app);
    (0, db_1.default)();
});
