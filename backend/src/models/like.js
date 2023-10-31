'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Like.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
            Like.belongsTo(models.Song, { foreignKey: 'songId', targetKey: 'id', as: 'song' });
        }
    }
    Like.init(
        {
            songId: DataTypes.INTEGER,
            userId: {
                type: DataTypes.UUID,
                field: 'user_id',
            },
            songId: {
                type: DataTypes.UUID,
                field: 'song_id',
            },
        },
        {
            sequelize,
            modelName: 'Like',
        },
    );
    return Like;
};
