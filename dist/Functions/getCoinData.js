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
exports.default = getCoinData;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const api_key = process.env.API_KEY;
const saveCoinData_1 = __importDefault(require("./saveCoinData"));
function getCoinData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,matic-network`, {
            headers: {
                'x-cg-demo-api-key': api_key
            }
        }).then((res) => {
            console.log("Data Fetched.");
            res.data.forEach((coin) => {
                (0, saveCoinData_1.default)(coin);
            });
            console.log("Data Saved.");
        });
    });
}
;
