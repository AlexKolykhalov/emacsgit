// @ts-check

import express from 'express';

import { userService } from '../services/index.service.js';

/**
 * Handles a GET request to the / endpoint.
 * @async
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function get(req, res, next) {
    try {
	const token = req.headers.authorization?.split(' ')[1];
	const user = await userService.get(token ?? '');
	res.status(200).json(user);
    } catch (error) {
	next(error);
    }
}

/**
 * Handles a PUT request to the / endpoint.
 * @async
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function update(req, res, next) {
    try {
	const token = req.headers.authorization?.split(' ')[1];
	const data = req.body;
	const user = await userService.update(token ?? '', data);
	res.status(201).json(user);
    } catch (error) {
	next(error);
    }
}

/**
 * Handles a DELETE request to the / endpoint.
 * @async
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function remove(req, res, next) {
    try {
	const token = req.headers.authorization?.split(' ')[1];
	await userService.remove(token ?? '');
	res.clearCookie("refreshToken");
	res.sendStatus(204);
    } catch (error) {
	next(error);
    }
}


export { get, update, remove };
