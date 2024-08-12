export default (err, req, res, next) => {
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
