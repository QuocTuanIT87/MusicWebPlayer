'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Follow extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Follow.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
        }
    }
    Follow.init(
        {
            userId: {
                type: DataTypes.UUID,
                field: 'user_id',
            },
            followerId: {
                type: DataTypes.UUID,
                field: 'follower_id',
            },
        },
        {
            sequelize,
            modelName: 'Follow',
        },
    );
    return Follow;
};
