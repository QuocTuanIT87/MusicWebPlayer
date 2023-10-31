'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            avatar: {
                type: Sequelize.STRING,
            },
            bio: {
                type: Sequelize.STRING,
            },
            heart_count: {
                type: Sequelize.INTEGER,
            },
            phoneNumber: {
                type: Sequelize.STRING,
            },
            facebook_link: {
                type: Sequelize.STRING,
            },
            tiktok_link: {
                type: Sequelize.STRING,
            },
            instagram_link: {
                type: Sequelize.STRING,
            },
            song_count: {
                type: Sequelize.INTEGER,
            },
            birthday: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            cover_image: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            roleId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
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
        await queryInterface.dropTable('Users');
    },
};
