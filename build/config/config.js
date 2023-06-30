"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
// const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = process.env.MONGO_URL || '';
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
console.log(SERVER_PORT);
exports.config = {
    mongo: {
        url: MONGO_URL,
        // username: MONGO_USERNAME,
        // password: MONGO_PASSWORD,
    },
    server: {
        port: SERVER_PORT
    }
};
