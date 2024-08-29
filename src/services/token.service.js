// @ts-check

import jwt from 'jsonwebtoken';

import db from '../database/models/index.js'
import AppError from '../errors/app.error.js';


/**
 * Generates a new pair of tokens.
 * @function
 * @param {{}} payload
 * @returns {{accessToken:string, refreshToken:string}}
 */
function generateTokens(payload) {
    const accessToken = jwt.sign(
	payload,
	process.env.SECRET_ACCESS_TOKEN,
	{expiresIn: '10m'}
    );
    const refreshToken = jwt.sign(
	payload,
	process.env.SECRET_REFRESH_TOKEN,
	{expiresIn: '30m'}
    );

    return {
	accessToken: accessToken,
	refreshToken: refreshToken,
    };
}

/**
 * Saves token in DB.
 * @async
 * @function
 * @param {string} token
 * @param {string} id User ID
 * @returns {Promise<void>}
 */
async function save(token, id) {
    const candidate = await db.Token.findOne({where: {userId: id}});
    if (!candidate) {
	await db.Token.create({hash: token, userId: id});
    } else {
	candidate.hash = token;
	await candidate.save();
    }
}

/**
 * Delete token from DB.
 * @async
 * @function
 * @param {string} token
 * @returns {Promise<void>}
 * @throws {AppError}
 */
async function remove(token) {
    const result = await db.Token.destroy({where: {hash: token}});
    if (!result) throw AppError.badRequest('Cant find token');
    return result;
}

/**
 * @function
 * @param {string} token
 * @returns {{}|null}
 */
function verifyAccessToken(token) {
    try {
	return jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    } catch (error) {
	return null;
    }
}

/**
 * @function
 * @param {string} token
 * @returns {{}|null}
 */
function verifyRefreshToken(token) {
    try {
	return jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
    } catch (error) {
	return null;
    }
}


export { generateTokens, save, remove, verifyAccessToken, verifyRefreshToken };
