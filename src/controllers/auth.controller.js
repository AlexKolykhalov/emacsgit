// @ts-check

import express from 'express';

import { authService } from '../services/index.service.js';


/**
 * Handles a POST request to the /login endpoint. 
 * @async
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function login(req, res, next) {
    try {
	const { email, password } = req.body;
	const tokens = await authService.login(email, password);
	res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 10 });
	res.status(200).json(tokens.accessToken);
    } catch (error) {
	next(error);
    }
}

/**
 * Handles a POST request to the /signup endpoint. 
 * @async
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function signup(req, res, next) {
    try {
	const { email, password } = req.body;
	const tokens = await authService.signup(email, password);
	res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 10 });
	res.status(201).json(tokens.accessToken);
    } catch (error) {
	next(error);
    }
}

/**
 * Handles a GET request to the /logout endpoint. 
 * @function
 * @param {express.Request} _
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {void}
 */
function logout(_, res, next) {
    try {
	// when we have 1:1 relation between Token and User we don't need delete token from DB
	// it  will be overwritten the next time you enter
	res.clearCookie('refreshToken');
	res.sendStatus(200);
    } catch (error) {
	next(error);
    }
}

/**
 * Handles a GET request to the /refresh endpoint. 
 * @async
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function refresh(req, res, next) {
    try {
	const token = req.cookies.refreshToken;
	const tokens = await authService.refresh(token);
	res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
	res.status(200).json(tokens.accessToken);
    } catch (error) {
	next(error);
    }
}

export { login, logout, signup, refresh };
