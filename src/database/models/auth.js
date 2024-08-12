'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Auth extends Model {
	static associate(models) {
	}
    }
    Auth.init({
	email: {
	    type: DataTypes.STRING,
	    allowNull: false,
	},
	password: {
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
	modelName: 'Auth',
    });
    return Auth;
};
