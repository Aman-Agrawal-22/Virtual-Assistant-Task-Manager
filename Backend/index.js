import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnection } from "./configs/database.js";
import todoRoutes from "./routes/todoRoutes.js";
import { scheduleReminders } from "./services/remainingTasks.js";
dotenv.config();
console.log("API Key:", process.env.GOOGLE_API_KEY ? "Loaded" : "Not Found");
const app = express();
app.use(cors());  
app.use(bodyParser.json());

dbConnection();
scheduleReminders();
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
