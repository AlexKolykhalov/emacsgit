class AppError extends Error {
    constructor(message, statusCode, errors = []) {
	super(message);
	this.statusCode = statusCode;
	this.errors = errors;

	Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message, errors = []) {
	return new AppError(message, 400, errors);
    }

    static unauthorized(message) {
	return new AppError(message, 401);
    }
}


export default AppError;
