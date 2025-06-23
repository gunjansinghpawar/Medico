import mongoose from "mongoose";
import { DATABSE_URL } from "../../../ConstandURLS";

if (!DATABSE_URL) {
    throw new Error("Please define the DATABSEURL environment variable inside .env.local");
}

interface MongooseGlobal {
    mongoose?: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}
const globalWithMongoose = global as typeof global & MongooseGlobal;
const cached = globalWithMongoose.mongoose || { conn: null, promise: null };

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(DATABSE_URL, {
            bufferCommands: false,
        }).then(mongoose => {
            console.log("✅ MongoDB connected");
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}