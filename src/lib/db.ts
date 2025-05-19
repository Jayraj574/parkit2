// db.ts
import * as mongoose from "mongoose";

const MONGODB_URI = process.env.VITE_MONGODB_URI || "";

let connection: mongoose.Connection | null = null;

export async function connectDB(): Promise<typeof mongoose | null> {
  try {
    if (!MONGODB_URI) {
      console.warn("MONGODB_URI is not defined in environment variables");
      return null;
    }

    const db = await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    connection = mongoose.connection;

    connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    connection.on("error", (err) => {
      console.error("MongoDB error:", err);
    });

    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default mongoose;
