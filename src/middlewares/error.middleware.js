// @ts-check

import express from 'express';

import AppError from '../errors/index.error.js';

/**
 * @function
 * @param {AppError} err
 * @param {express.Request} _
 * @param {express.Response} res
 * @param {express.NextFunction} __
 * @returns {void}
 */
export default (err, _, res, __) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    const errors = err.errors || [];

    res.status(statusCode).json({
	status: 'error',
	statusCode,
	message,
	errors
    });
}
