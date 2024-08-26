// @ts-check

import express from 'express';
import { body, validationResult } from 'express-validator';

import AppError from '../errors/index.error.js';


export default [
    body('email').isEmail(),
    body('firstName').isLength({min: 3, max: 40}),
    body('lastName').isLength({min: 3, max: 40}),
        /**
	 * @function
	 * @param {express.Request} req
	 * @param {express.Response} _
	 * @param {express.NextFunction} next
	 * @returns {void}
	 * @throws {AppError} Throws AppError.badRequest
	 */
    (req, _, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return next(AppError.badRequest('Validation error', errors.array()));
	next();
    }
];
