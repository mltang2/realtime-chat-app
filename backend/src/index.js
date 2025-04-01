import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import { connectDatabase } from "./lib/database.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes)
app.listen(PORT, () => {
    console.log("server is running on PORT: "  + PORT);
    connectDatabase();
});