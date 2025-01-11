# Cryptocurrency Tracker API

🎉🎉 This project is a small backend service that fetches cryptocurrency data for three coins — **Bitcoin**, **Ethereum**, and **Matic-Network** — from the CoinGecko API and stores it in a MongoDB database every 2 hours. It also provides two routes to fetch useful statistics about the coins.

## File Structure 📂

```
.
├── Database
│   └── index.ts          # MongoDB connection and schema definitions
├── Functions
│   ├── calculateDeviation.ts  # Calculates population standard deviation
│   ├── getCoinData.ts         # Fetches data from CoinGecko API
│   └── saveCoinData.ts        # Saves fetched data into the database
├── index.ts               # Main entry point of the application
└── types
    └── env.d.ts          # Type definitions for environment variables
```

## Features 🌟

- **Automated Data Fetching:**
  - Fetches the latest data for Bitcoin, Ethereum, and Matic-Network from the CoinGecko API every 2 hours using `node-cron`.
  - Stores the data (price, market cap, 24-hour price change) in a MongoDB database.

- **API Endpoints:**
  - `/api/v1/stats/:coinName`
    - Retrieves the latest entry for the given coin.
    - Response includes:
      - `price`
      - `market_cap`
      - `24h_Change`
  
  - `/api/v1/deviation/:coinName`
    - Calculates and returns the population standard deviation of the coin's price based on the last 100 entries (or fewer if less data is available).

## Setup 🛠️

### Prerequisites ✅

- **Node.js** (v14 or higher)
- **MongoDB** instance (local or cloud-based)

### Installation 📥

1. Clone the repository:
   ```bash
   git clone https://github.com/junker149/KoinX.git)
   cd Koinx
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=3000
   MONGO_URI=<your-mongodb-uri>
   API_KEY=<your-coingecko-api-key>
   ```

4. Build the TypeScript code:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

## Usage 📊

### Routes 🚀

1. **Get Latest Coin Stats**
   - **Endpoint:** `/api/v1/stats/:coinName`
   - **Method:** `GET`
   - **Description:** Returns the latest entry for the specified coin.
   - **Example:**
     ```bash
     curl http://localhost:3000/api/v1/stats/bitcoin
     ```

2. **Get Population Standard Deviation**
   - **Endpoint:** `/api/v1/deviation/:coinName`
   - **Method:** `GET`
   - **Description:** Calculates and returns the population standard deviation of the coin's price for the last 100 entries (or fewer).
   - **Example:**
     ```bash
     curl http://localhost:3000/api/v1/deviation/ethereum
     ```

## Scripts 🖥️

- `npm run build`: Compiles TypeScript into JavaScript.
- `npm start`: Starts the compiled application.
- `npm run dev`: Starts the application in development mode with `ts-node`.

## Technologies Used 🖥️🛠️💾

- **Node.js** with **Express.js**
- **TypeScript**
- **MongoDB** with Mongoose
- **CoinGecko API**
- **node-cron** for task scheduling

## Notes 📝

- Ensure that your MongoDB instance is accessible and properly configured in the `.env` file.
- The CoinGecko API key must be valid and active.
- This service uses population standard deviation for the `/deviation` endpoint.

## Acknowledgments 📚

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data.

