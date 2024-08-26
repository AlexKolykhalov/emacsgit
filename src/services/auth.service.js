// @ts-check

import bcrypt from 'bcrypt';

import db from '../database/models/index.js';
import { tokenService } from '../services/index.service.js';
import AppError from '../errors/index.error.js';


/**
 * Checks email, password in the DB and generates a pair of tokens.
 * @async
 * @function
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{accessToken:string, refreshToken:string}>}
 * @throws {AppError} Throws AppError.unauthorized
 */
async function login(email, password) {
    const candidate = await db.Auth.findOne({where: {email: email}});    
    if (!candidate) throw AppError.unauthorized("Email and Password don't match.");
    const match = await bcrypt.compare(password, candidate.password);
    if (!match) throw AppError.unauthorized("Email and Password don't match.");

    const payload = {id: candidate.userId};
    const tokens = tokenService.generateTokens(payload);
    await tokenService.save(tokens.refreshToken, candidate.userId);

    return tokens;
}

/**
 * Checks email, creates a User in the DB and generates a pair of tokens.
 * @async
 * @function
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{accessToken:string, refreshToken:string}>}
 * @throws {AppError} Throws AppError.badRequest
 */
async function signup(email, password) {
    let tokens = {accessToken: '', refreshToken: ''};
    await db.sequelize.transaction(async () => {
	const candidate = await db.Auth.findOne({where: {email: email}});
	if (candidate) throw AppError.badRequest(
	    'Registration could not be completed. If you have an account, please log in.'
	);
	const user = await db.User.create({email: email});
	const hash = await bcrypt.hash(password, 10);
	await db.Auth.create({email: email, password: hash, userId: user.id});

	const payload = {id: user.id};
	tokens = tokenService.generateTokens(payload);
	await tokenService.save(tokens.refreshToken, user.id);
    });

    return tokens;
}

// /**
//  * @async
//  * @function
//  * @param {string} token
//  * @returns {Promise<void>}
//  * @throws {AppError} Throws AppError.badRequest
//  */
// async function logout(token) {
//     const result = await db.Token.destroy({where: {hash: token}});
//     if (result !== 1) throw AppError.badRequest('Token not found');    
// }

/**
 * Verifies refresh token the DB and generates a new pair of tokens.
 * @async
 * @function
 * @param {string} token
 * @returns {Promise<{accessToken:string, refreshToken:string}>}
 * @throws {AppError} Throws AppError.unauthorized
 */
async function refresh(token) {
    const payload = tokenService.verifyRefreshToken(token);
    if (!payload) throw AppError.unauthorized(
	'Authorization token is required to access this resource.'
    );
    const dbToken = await db.Token.findOne({where: {hash: token}});
    if (!dbToken) throw AppError.unauthorized(
	'Authorization token is required to access this resource.'
    );
    const newPayload = {id: payload.id};
    const tokens = tokenService.generateTokens(newPayload);
    await tokenService.save(tokens.refreshToken, newPayload.id);

    return tokens;
}

export { login, signup, refresh };
