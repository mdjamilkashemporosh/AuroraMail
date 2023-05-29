import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import handlebars from 'handlebars';
import  fetchTemplate  from '../services/templateService';
import {Transporter} from '../config/config';
import dotenv from 'dotenv';

dotenv.config();

const handleSendEmail = async (req: Request, res: Response) => {

  try {
    const { email, subject, templateURL, data } = req.body;

    fetchTemplate(templateURL)
      .then((content: string) => {
        const template = handlebars.compile(content);
        const html = template(data);
        Transporter.sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: subject,
          html: html,
        }).then((data)=>{
          res.status(200).send(`Email sent successfully! : ${data}`);
        })
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