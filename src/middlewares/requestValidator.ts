import { body } from 'express-validator';

export const dataValidation = [
  body('email').isEmail().normalizeEmail(),
  body('subject').notEmpty().isString(),
  body('templateURL').isURL(),
  body('data')
    .isObject()
    .custom((value: { [key: string]: string | number }, { req }: any) => {
      for (const prop in value) {
        if (typeof value[prop] !== 'string' && typeof value[prop] !== 'number') {
          throw new Error(`Property '${prop}' in 'data' must be a string or number`);
        }
      }
      return true;
    }),
];
