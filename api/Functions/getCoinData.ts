import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const api_key = process.env.API_KEY;
import saveCoinData from "./saveCoinData";

export default function getCoinData() {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,matic-network`, {
        headers: {
            'x-cg-demo-api-key': api_key
        }
    }).then((res) => {
        console.log("Data Fetched.");
        res.data.forEach((coin: any) => {
            saveCoinData(coin);
        });
        console.log("Data Saved.");
    })
};