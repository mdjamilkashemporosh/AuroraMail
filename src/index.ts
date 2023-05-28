import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";

const app = express();
const port = 3000;

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
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
// Error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Data validation middleware
const validateData = [
  body("email").isEmail().normalizeEmail(),
  body("subject").notEmpty().isString(),
  body("templateURL").isURL(),
  body("others")
    .isObject()
    .custom((value, { req }) => {
      for (const prop in value) {
        if (
          typeof value[prop] !== "string" &&
          typeof value[prop] !== "number"
        ) {
          throw new Error(`Property '${prop}' in 'others' must be a string`);
        }
      }
      return true;
    }),
];
// Request handler
const sendEmailHandler = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, subject, templateURL, others } = req.body;
  // Process the valid data
  res.send("Hello, world!");
};
// Route handler
app.post("/send-email", validateData, sendEmailHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
