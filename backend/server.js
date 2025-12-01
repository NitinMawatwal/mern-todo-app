import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.get('/', (req, res) => {
    res.send("server is running")
})

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));