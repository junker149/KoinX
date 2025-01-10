"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ethereum = exports.Matic = exports.Bitcoin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URL = process.env.MONGO_URI;
mongoose_1.default.connect(URL);
const bitcoinSchema = new mongoose_1.default.Schema({
    price: Number,
    market_cap: Number,
    day_change: Number
});
const maticSchema = new mongoose_1.default.Schema({
    price: Number,
    market_cap: Number,
    day_change: Number
});
const ethereumSchema = new mongoose_1.default.Schema({
    price: Number,
    market_cap: Number,
    day_change: Number
});
const Bitcoin = mongoose_1.default.model('Bitcoin', bitcoinSchema);
exports.Bitcoin = Bitcoin;
const Matic = mongoose_1.default.model('Matic', maticSchema);
exports.Matic = Matic;
const Ethereum = mongoose_1.default.model('Ethereum', ethereumSchema);
exports.Ethereum = Ethereum;
