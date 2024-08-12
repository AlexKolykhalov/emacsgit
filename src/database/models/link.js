'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Link extends Model {
	static associate(models) {	    
	}
    }
    Link.init({
	title: DataTypes.STRING
    }, {
	sequelize,
	modelName: 'Link',
    });
    return Link;
};
