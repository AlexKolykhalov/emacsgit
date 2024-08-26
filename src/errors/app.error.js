// @ts-check
    
/**
 * Represents a custom error.
 * @class
 */
export default class AppError extends Error {
    /**
     * @constructor
     * @param {string} message
     * @param {number} statusCode
     * @param {Array} errors
     */
    constructor(message, statusCode, errors = []) {
	super(message);
	/** @type {number} */
	this.statusCode = statusCode;
	/** @type {Array} */
	this.errors = errors;

	Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Returns error with status code 400.
     * @param {string} message
     * @param {Array} errors
     * @returns {AppError}
     */
    static badRequest(message, errors = []) {
	return new AppError(message, 400, errors);
    }

    /**
     * Returns error with status code 401.
     * @param {string} message
     * @param {Array} errors
     * @returns {AppError}
     */
    static unauthorized(message, errors = []) {
	return new AppError(message, 401, errors);
    }
}
