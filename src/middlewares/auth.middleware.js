import { body, validationResult } from 'express-validator';
import { AppError } from '../errors/index.error.js';


export default [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 3, max: 10}).withMessage('Your password must contain between 3 and 10 characters'),
    
    (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return next(AppError.badRequest('Validation error', errors.array()));
	next();
    }
];
