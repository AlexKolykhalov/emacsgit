'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
	static associate(models) {
	    this.hasOne(models.Auth, {foreignKey: 'userId'});
	    this.hasOne(models.Token, {foreignKey: 'userId'});
	}
    }
    User.init({
	firstName: {type: DataTypes.STRING, defaultValue: 'Anonim'},
	lastName: {type: DataTypes.STRING, defaultValue: 'Anonim'},
	email: DataTypes.STRING,
	isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},    
	activationLink: DataTypes.STRING
    }, {
	sequelize,
	modelName: 'User',
    });
    return User;
};
