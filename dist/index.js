"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCoinData_1 = __importDefault(require("./Functions/getCoinData"));
const node_cron_1 = __importDefault(require("node-cron"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
node_cron_1.default.schedule("*/1 * * * *", () => {
    (0, getCoinData_1.default)();
});
