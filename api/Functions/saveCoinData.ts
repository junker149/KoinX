import { Coin } from "../Database/index";

interface CoinInfo {
    id: string;
    current_price: number;
    market_cap: number;
    price_change_24h: number;
};

export default async function saveCoinData(coin: CoinInfo) {
    await Coin.create({
        name: coin.id,
        price: coin.current_price,
        market_cap: coin.market_cap,
        day_change: coin.price_change_24h
    });
};