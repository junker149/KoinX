"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getCoinData_1 = __importDefault(require("./Functions/getCoinData"));
const node_cron_1 = __importDefault(require("node-cron"));
const Database_1 = require("./Database");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, getCoinData_1.default)();
node_cron_1.default.schedule("0 */2 * * *", () => {
    try {
        (0, getCoinData_1.default)();
        console.log("Data fetched successfully.");
    }
    catch (err) {
        console.error("Error in scheduled task:", err);
    }
});
// @ts-ignore
app.get("/api/v1/stats/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const coin = yield Database_1.Coin.findOne({ name }).sort({ createdAt: -1 });
        if (!coin) {
            return res.status(404).json({
                message: "no entries yet"
            });
        }
        return res.status(200).json({
            price: coin.price,
            marketCap: coin.market_cap,
            "24hChange": coin.day_change
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}));
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
