import express from "express";
import { Request, Response } from "express";
import getCoinData from "./Functions/getCoinData";
import cron from "node-cron";
import { Coin } from "./Database";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

getCoinData();
cron.schedule("0 */2 * * *", () => {
  try {
    getCoinData();
    console.log("Data fetched successfully.");
  } catch (err) {
    console.error("Error in scheduled task:", err);
  }
});

// @ts-ignore
app.get("/api/v1/stats/:name", async (req: Request, res: Response) => {
  try {
    const name = req.params.name;

    const coin = await Coin.findOne({name: name}).sort({ createdAt: -1 });

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

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});