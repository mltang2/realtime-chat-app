import express from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "/routes/message.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./lib/database.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.listen(PORT, () => {
    console.log("server is running on PORT: "  + PORT);
    connectDatabase();
});