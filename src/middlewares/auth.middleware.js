// @ts-check

import express from 'express';
import { body, validationResult } from 'express-validator';

import AppError from '../errors/index.error.js';


export default [
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 10}),
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
	if (!errors.isEmpty()) return next(AppError.badRequest('Auth validation error', errors.array()));
	next();
    }
];
