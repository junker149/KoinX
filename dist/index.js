"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const api_key = process.env.API_KEY;
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,matic-network&vs_currencies=usd';
const options = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': api_key }
};
axios_1.default.get(url, options)
    .then((res) => {
    console.log(res.data);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
