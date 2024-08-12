import { check, header, validationResult } from 'express-validator';

import { AppError } from '../errors/index.error.js';


const refreshTokenValidation = [
    header('Authorization')
	.exists().isString()
	.custom(async (value)=>{
	    if (!value.startsWith('Bearer ')) {
		throw new Error('Authorization header must start with Bearer');
	    }
	    const token = value.split(' ')[1];
	    if (!token) throw new Error('Token is missing');
	    const errors = await check('token').isJWT().run({body:{token}});
	    if (!errors.isEmpty()) throw new Error('Invalid token');
	    return true;
	}),
		
    (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return next(AppError.badRequest('Validation error', errors.array()));
	next();
    }
];

const accessTokenValidation = [];


export { refreshTokenValidation, accessTokenValidation };
