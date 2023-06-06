import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

/**
 * Middleware for validating data
 * Validates the request body fields using express-validator
 * Fields validated: email, subject, templateURL, data (optional)
 * Returns a 400 response with validation errors if any
 */
export const dataValidation = [
  // Validate email field
  body('email').notEmpty().withMessage('Email is required').isEmail(),

  // Validate subject field
  body('subject').notEmpty().withMessage('Subject is required'),

  // Validate templateURL field as a URL
  body('templateURL')
    .notEmpty().withMessage('Valid template URL is required').isURL(),

  // Make the 'data' field optional

  // Middleware function to handle validation results
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

/**
 * Middleware for validating data field
 * Checks if the 'data' field, when available, is a string, number, or object
 * Returns a 400 response with an error message if validation fails
 */
export const validateData = (req: Request, res: Response, next: NextFunction) => {
  const { data } = req.body;

  if (data && !(typeof data === 'string' || typeof data === 'number' || typeof data === 'object')) {
    return res.status(400).json({ errors: [{ msg: 'Data must be a string, number, or object' }] });
  }

  next();
};
