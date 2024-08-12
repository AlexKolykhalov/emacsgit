import bcrypt from 'bcrypt';

import db from '../database/models/index.js';
import { tokenService } from '../services/index.service.js';
import { AppError } from '../errors/index.error.js';


// curl -i -d '{"email":"ak@com.ru","password":"1234"}' -H "Content-Type:application/json" localhost:3000/login &
async function login(email, password) {
    let tokens = {};
    await db.sequelize.transaction(async () => {
	const candidate = await db.Auth.findOne({where: {email: email}});
	// TODO don't forget remove (email) and (password)
	if (!candidate) throw AppError.unauthorized("Email and Password don't match (email).");
	const match = await bcrypt.compare(password, candidate.password);
	if (!match) throw AppError.unauthorized("Email and Password don't match (password).");

	const payload = {id: candidate.userId};
	tokens = tokenService.generateTokens(payload);
	await tokenService.save(tokens.refreshToken, candidate.userId);
    });

    return tokens;
}

// curl -i -d '{"email":"ak@com.ru","password":"1234"}' -H "Content-Type:application/json" localhost:3000/signup &
async function signup(email, password) {
    let tokens = {};
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

async function logout() {
    const user = await db.User.destroy({where: {email: email}});

    return user;
}

// curl -i -H "Authorization: Bearer " localhost:3000/signup &
async function refresh(token) {
    const payload = tokenService.verifyRefreshToken(token);
    if (!payload) throw AppError.unauthorized(
	'Authorization token is required to access this resource.'
    );	
    const dbToken = await db.Token.findOne({where: {hash: token}});
    if (!dbToken) throw AppError.unauthorized(
	'Authorization token is required to access this resource.'
    );
    const tokens = tokenService.generateTokens(payload);
    await tokenService.save(tokens.refreshToken, payload.id);

    return tokens;
}


export { login, signup, logout, refresh };
