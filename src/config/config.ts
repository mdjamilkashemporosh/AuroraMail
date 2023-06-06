import { createTransport, Transporter as NodemailerTransporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Nodemailer transporter for sending emails
 */
export const Transporter: NodemailerTransporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
