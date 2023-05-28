import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { createTransport } from 'nodemailer';
import morgan from "morgan";
import axios from "axios";
import handlebars from "handlebars";
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

async function fetchTemplate(templateURL: string): Promise<string> {
  try {
    const response = await axios.get(templateURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching template:", error);
    throw new Error("Failed to fetch template");
  }
}

// Request handler
const sendEmailHandler = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, subject, templateURL, others } = req.body;
    const transporter = createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: 'demo@imaginebeyond.net',
        pass: 'Poroshpo123@',
      },
    });
    fetchTemplate(templateURL).then((content) => {
      const template = handlebars.compile(content);
      const html = template(others);
      transporter.sendMail({
        from: 'demo@imaginebeyond.net',
        to: email,
        subject: subject,
        html: html,
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
};
// Route handler
app.post("/send-email", validateData, sendEmailHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
