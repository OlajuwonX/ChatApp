import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");

        // Check if MONGODB_URI exists
        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is not defined in environment variables");
            return;
        }

        // Add debugging to see what's being read
        console.log("MONGODB_URI:", process.env.MONGODB_URI.substring(0, 20) + "...");

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        console.error("Full error:", error);
        process.exit(1);
    }
};