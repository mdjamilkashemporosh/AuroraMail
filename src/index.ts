import express from "express";
import { dataValidation } from "./middlewares/requestValidator";
import handleSendEmail from "./controllers/emailController";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from 'dotenv';

dotenv.config();

// Create Express application
const app = express();
const port = process.env.PORT || 8000;

// Create a logs directory if it doesn't exist
const logsDirectory = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// Create a write stream for the log file
const logStream = fs.createWriteStream(path.join(logsDirectory, "access.log"), {
  flags: "a",
});

// Middleware for logging
app.use(morgan("combined", { stream: logStream }));

// Enable CORS
app.use(cors());

// Parse request body as JSON
app.use(bodyParser.json());

// Set security headers
app.use(helmet());

// Route handler for sending email
app.post("/send-email", dataValidation, handleSendEmail);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
