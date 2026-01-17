import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  // ✅ Already connected (hot start)
  if (cached.conn) {
    console.log("✅ MongoDB: Using cached connection");
    return cached.conn;
  }

  // ⏳ First time / cold start
  if (!cached.promise) {
    console.log("⏳ MongoDB: Creating new connection...");

    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log("🎉 MongoDB: Connected successfully");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB: Connection failed", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
