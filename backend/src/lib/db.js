import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Add debugging to see what's being read
        console.log("MONGODB_URI:", process.env.MONGODB_URI);

        // Check if MONGODB_URI exists
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
        process.exit(1);
    }
};