import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongo Database connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log("Mongo Database connection error", error);
    }
};