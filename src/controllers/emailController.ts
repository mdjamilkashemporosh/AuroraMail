import { Request, Response } from 'express';
import handlebars from 'handlebars';
import fetchTemplate from '../services/templateService';
import { Transporter } from '../config/config';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Handles the sending of an email
 * @param req The request object
 * @param res The response object
 */
const handleSendEmail = async (req: Request, res: Response) => {
  try {
    const { email, subject, templateURL, data } = req.body;

    // Fetch the template content
    fetchTemplate(templateURL)
      .then((content: string) => {
        // Compile the template with Handlebars
        const template = handlebars.compile(content);
        const html = template(data);

        // Send the email using the configured Transporter
        Transporter.sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: subject,
          html: html,
        }).then(() => {
          res.status(200).send('Email sent successfully!');
        });
      })
      .catch((error: Error) => {
        console.error('Error fetching template:', error);
        res.status(500).send('Error fetching template');
      });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
};

export default handleSendEmail;
