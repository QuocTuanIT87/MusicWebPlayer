'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Comments', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            comment: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.UUID,
                field: 'user_id',
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            songId: {
                type: Sequelize.UUID,
                field: 'song_id',
                references: {
                    model: 'songs',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Comments');
    },
};
