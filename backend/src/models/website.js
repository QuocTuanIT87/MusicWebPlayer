'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Website extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Website.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
        }
    }
    Website.init(
        {
            link: DataTypes.STRING,
            userId: {
                type: DataTypes.UUID,
                field: 'user_id',
            },
        },
        {
            sequelize,
            modelName: 'Website',
        },
    );
    return Website;
};
