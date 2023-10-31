'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Song extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Song.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'id', as: 'user' });
            Song.hasMany(models.Like, { sourceKey: 'id', foreignKey: 'songId', as: 'like' });
            Song.hasMany(models.Comment, { sourceKey: 'id', foreignKey: 'songId', as: 'comment' });
        }
    }
    Song.init(
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name_song: DataTypes.STRING,
            lyric: DataTypes.STRING,
            audio: DataTypes.STRING,
            song_description: DataTypes.STRING,
            avatar_song: DataTypes.STRING,
            category: DataTypes.STRING,
            userId: {
                type: DataTypes.UUID,
                field: 'user_id',
            },
        },
        {
            sequelize,
            modelName: 'Song',
        },
    );
    return Song;
};
