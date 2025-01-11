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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = saveCoinData;
const index_1 = require("../Database/index");
;
function saveCoinData(coin) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield index_1.Coin.create({
                name: coin.id,
                price: coin.current_price,
                market_cap: coin.market_cap,
                day_change: coin.price_change_24h
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
;
