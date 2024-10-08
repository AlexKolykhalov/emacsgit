// @ts-check

import express from 'express';
import { header, validationResult } from 'express-validator';

import AppError from '../errors/index.error.js';


export default [
    header('Authorization')
	.exists()
	.isString()
	.custom((value) => {	   
	    return value.startsWith('Bearer ');
	}),
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
	if (!errors.isEmpty()) return next(AppError.badRequest('Token validation error', errors.array()));
	next();
    }
];
