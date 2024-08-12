import jwt from 'jsonwebtoken';

import db from '../database/models/index.js'


function generateTokens(payload) {
    const accessToken = jwt.sign(
	payload,
	process.env.SECRET_ACCESS_TOKEN,
	{expiresIn: '1min'}
    );
    const refreshToken = jwt.sign(
	payload,
	process.env.SECRET_REFRESH_TOKEN,
    );

    return {
	accessToken: accessToken,
	refreshToken: refreshToken,
    };
}

async function save(token, id) {
    const candidate = await db.Token.findOne({where: {userId: id}});
    if (!candidate) {
	await db.Token.create({hash: token, userId: id});
    } else {
	candidate.hash = token;
	await candidate.save();
    }
}

function verifyAccessToken(token) {
    try {
	return jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    } catch (error) {
	return null;
    }
}

function verifyRefreshToken(token) {
    try {
	return jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
    } catch (error) {
	return null;
    }
}


export { generateTokens, save, verifyAccessToken, verifyRefreshToken };
