'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Follow, { sourceKey: 'id', foreignKey: 'userId', as: 'follows' });
            User.hasMany(models.Comment, { sourceKey: 'id', foreignKey: 'userId', as: 'comments' });
            User.hasMany(models.Song, { sourceKey: 'id', foreignKey: 'userId', as: 'songs' });
            User.hasMany(models.Website, { sourceKey: 'id', foreignKey: 'userId', as: 'websites' });
            User.hasMany(models.Like, { sourceKey: 'id', foreignKey: 'userId', as: 'likes' });
        }
    }
    User.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            email: DataTypes.STRING,
            lastName: DataTypes.STRING,
            firstName: DataTypes.STRING,
            avatar: DataTypes.STRING,
            bio: DataTypes.STRING,
            heart_count: DataTypes.INTEGER,
            phoneNumber: DataTypes.STRING,
            facebook_link: DataTypes.STRING,
            tiktok_link: DataTypes.STRING,
            instagram_link: DataTypes.STRING,
            song_count: DataTypes.INTEGER,
            birthday: DataTypes.DATE,
            cover_image: DataTypes.STRING,
            password: DataTypes.STRING,
            roleId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
