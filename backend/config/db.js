import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI); // Changed from MONGO_URL
        console.log("\nMongoDB connected\n");
    } catch (err) {
        console.log("MongoDB connection error", err);
        process.exit(1);
    }
};

export default connectDB;
