"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URL = process.env.MONGO_URI;
mongoose_1.default.connect(URL);
const coinSchema = new mongoose_1.default.Schema({
    name: String,
    price: Number,
    market_cap: Number,
    day_change: Number
});
const Coin = mongoose_1.default.model('Coin', coinSchema);
exports.Coin = Coin;
