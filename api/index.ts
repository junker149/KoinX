import express from "express";
import { Request, Response } from "express";
import getCoinData from "./Functions/getCoinData";
import cron from "node-cron";
import { Coin } from "./Database";
import cors from "cors";
import dotenv from 'dotenv';
import calculateDeviation from "./Functions/calculateDeviation";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Call the function to get the data initially
getCoinData();

// Landing Page
app.get("/", (req, res) => {
  res.send("Hello to Koinx Team!");
});

// Schedule the function to run every 2 hours
cron.schedule("0 */2 * * *", () => {
  try {
    getCoinData();
  } catch (err) {
    console.error("Error in scheduled task:", err);
  }
});

// @ts-ignore
app.get("/api/v1/stats/:name", async (req: Request, res: Response) => {
  try {
    const name = req.params.name;

    // Validate
    if( name !== "bitcoin" && name !== "ethereum" && name !== "matic-network") {
      return res.status(400).json({
        message: "Usage: /api/v1/stats/bitcoin or /api/v1/stats/ethereum or /api/v1/stats/matic-network"
      });
    }

    // Get the latest entry
    const coin = await Coin.findOne({ name: name }).sort({ createdAt: -1 });

    // If no entry is found
    if (!coin) {
      return res.status(404).json({
        message: "no entries yet"
      });
    }

    // Return the data
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

// @ts-ignore
app.get("/api/v1/deviation/:name", async (req: Request, res: Response) => {
  try {
    const name = req.params.name;

    // Validate
    if( name !== "bitcoin" && name !== "ethereum" && name !== "matic-network") {
      return res.status(400).json({
        message: "Usage: /api/v1/deviation/bitcoin or /api/v1/deviation/ethereum or /api/v1/deviation/matic-network"
      });
    }

    // Get the last 100 entries
    const entries = await Coin.find({ name: name }).sort({ createdAt: -1 }).limit(100);

    // Isolate the price data
    const price: number[] = entries.map((entry) => {
      return entry.price;
    })

    // Calculate the deviation
    const deviation = calculateDeviation(price);

    return res.status(200).json({
      deviation: deviation
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