'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
	static associate(models) {
	}
    }
    Token.init({
	hash: {
	    type: DataTypes.STRING,
	    allowNull: false,
	},
	userId: {
	    type: DataTypes.STRING,
	    allowNull: false,
	    references: {
		model: 'Users',
		key: 'id',
	    },	    
	}
    }, {
	sequelize,
	modelName: 'Token',
    });
    return Token;
};
