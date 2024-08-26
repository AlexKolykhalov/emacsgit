// @ts-check

import db from '../database/models/index.js';
import { tokenService } from './index.service.js';
import AppError from '../errors/index.error.js';


/**
 * Gets user data after verifying a token.
 * @async
 * @function
 * @param {string} token
 * @returns {Promise<{}>}
 * @throws {AppError} Throws AppError.unauthorized
 */
async function get(token) {
    const payload = tokenService.verifyAccessToken(token);
    if (!payload) throw AppError.unauthorized(
	'Authorization token is required to access this resource.'
    );
    const user = await db.User.findOne({where: {id: payload.id}});
    return user;
}

/**
 * Updates user data after verifying a token.
 * @async
 * @function
 * @param {string} token
 * @returns 
 * @throws {AppError} Throws AppError.unauthorized
 */
async function update(token, data) {
    const payload = tokenService.verifyAccessToken(token);
    if (!payload) throw AppError.unauthorized(
	'Authorization token is required to access this resource.'
    );
    const result = await db.User.update(
	data,
	{
	    where: {id: payload.id},
	    returning: true,
	}
    );
    return {
	firstName: result[1][0].firstName,
	lastName: result[1][0].lastName,
	email: result[1][0].email
    };
}

async function remove() {
}


export { get, update, remove };
