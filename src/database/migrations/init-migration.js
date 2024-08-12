'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
	await queryInterface.createTable('Users', {
            id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
            },
            firstName: { type: Sequelize.STRING, defaultValue: 'Anonim' },
            lastName: { type: Sequelize.STRING, defaultValue: 'Anonim' },
            email: { type: Sequelize.STRING },
            isActivated: { type: Sequelize.BOOLEAN },
            activationLink: { type: Sequelize.STRING },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
	});
	await queryInterface.sequelize.query('ALTER TABLE "Users" ENABLE ROW LEVEL SECURITY;');

	await queryInterface.createTable('Auths', {
            id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
            },
            email: { type: Sequelize.STRING },
            password: { type: Sequelize.STRING },
            userId: {
		type: Sequelize.INTEGER,
		unique: true,
		allowNull: false,
		references: { model: 'Users', key: 'id' },
		onUpdate: 'cascade',
		onDelete: 'cascade'
            },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
	});
	await queryInterface.sequelize.query('ALTER TABLE "Auths" ENABLE ROW LEVEL SECURITY;');

	await queryInterface.createTable('Tokens', {
            id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
            },
            hash: { type: Sequelize.STRING },
            userId: {
		type: Sequelize.INTEGER,
		unique: true,
		allowNull: false,
		references: { model: 'Users', key: 'id' },
		onUpdate: 'cascade',
		onDelete: 'cascade'
            },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
	});
	await queryInterface.sequelize.query('ALTER TABLE "Tokens" ENABLE ROW LEVEL SECURITY;');
    },
    async down(queryInterface, Sequelize) {
	await queryInterface.sequelize.query('ALTER TABLE "Tokens" DISABLE ROW LEVEL SECURITY;');
	await queryInterface.dropTable('Tokens');
	await queryInterface.sequelize.query('ALTER TABLE "Auths" DISABLE ROW LEVEL SECURITY;');
	await queryInterface.dropTable('Auths');
	await queryInterface.sequelize.query('ALTER TABLE "Users" DISABLE ROW LEVEL SECURITY;');
	await queryInterface.dropTable('Users');
    }
};

