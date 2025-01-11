import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URL = process.env.MONGO_URI;

mongoose.connect(URL);

interface coin extends mongoose.Document {
    name: string;
    price: number;
    market_cap: number;
    day_change: number;
}

const coinSchema = new mongoose.Schema({
    name: String,
    price: Number,
    market_cap: Number,
    day_change: Number
},
    {
        timestamps: true
    }
);

const Coin: Model<coin> = mongoose.model<coin>('Coin', coinSchema);

export { Coin };