import express, { Request, Response } from "express";
import getCoinData from "./Functions/getCoinData";
import cron from "node-cron";

const app = express();
const port = 3000;

app.use(express.json());

cron.schedule("*/1 * * * *", () => {
    getCoinData();
});