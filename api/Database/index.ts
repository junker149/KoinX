import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URL = process.env.MONGO_URI;

mongoose.connect(URL);

interface Bitcoin extends mongoose.Document {
    price: number;
    market_cap: number;
    day_change: number;
}

interface Matic extends mongoose.Document {
    price: number;
    market_cap: number;
    day_change: number;
}

interface Ethereum extends mongoose.Document {
    price: number;
    market_cap: number;
    day_change: number;
}

const bitcoinSchema = new mongoose.Schema({
    price: Number,
    market_cap: Number,
    day_change: Number
});

const maticSchema = new mongoose.Schema({
    price: Number,
    market_cap: Number,
    day_change: Number
});

const ethereumSchema = new mongoose.Schema({
    price: Number,
    market_cap: Number,
    day_change: Number
});

const Bitcoin: Model<Bitcoin> = mongoose.model<Bitcoin>('Bitcoin', bitcoinSchema);
const Matic: Model<Matic> = mongoose.model<Matic>('Matic', maticSchema);
const Ethereum: Model<Ethereum> = mongoose.model<Ethereum>('Ethereum', ethereumSchema);

export { Bitcoin, Matic, Ethereum };