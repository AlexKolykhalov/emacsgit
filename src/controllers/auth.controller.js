import { authService } from '../services/index.service.js';


async function login(req, res, next) {
    try {
	const { email, password } = req.body;
	const tokens = await authService.login(email, password);
	res.cookie('token', tokens.refreshToken, {httpOnly: true, maxAge: 1000*60*60*10});
	res.status(200).json(tokens.accessToken);
    } catch (error) {
	next(error);
    }
}

async function signup(req, res, next) {
    try {
	const { email, password } = req.body;
	const tokens = await authService.signup(email, password);
	res.cookie('token', tokens.refreshToken, {httpOnly: true, maxAge: 1000*60*60*10});
	res.status(201).json(tokens.accessToken);
    } catch (error) {
	next(error);
    }
}

async function logout(req, res) {
    try {
	const user = await authService.removeAccount(email);
	res.status(204); // 204 No content
    } catch (error) {
	next(error);
    }
}

async function refresh(req, res, next) {
    try {
	const token = req.header('Authorization').split(' ')[1];
	const tokens = await authService.refresh(token);
	res.cookie('token', tokens.refreshToken, {httpOnly: true, maxAge: 1000*60*60*10});
	res.status(200).json(token.accessToken);
    } catch (error) {
	next(error);
    }
}

export { login, logout, signup, refresh };
