'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Songs', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            name_song: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lyric: {
                type: Sequelize.STRING,
            },
            audio: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            song_description: {
                type: Sequelize.STRING,
            },
            avatar_song: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                field: 'user_id',
                references: {
                    model: 'users',
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
        await queryInterface.dropTable('Songs');
    },
};
