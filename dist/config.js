"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    environment: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 8069,
    host: process.env.HOSTED_URL || "http://localhost:8069",
};
