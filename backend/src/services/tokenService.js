const jwt = require('jsonwebtoken');
const db = require('../models');
const { message } = require('../messages/message');
require('dotenv').config();

const createToken = (dataUser) => {
    const token = jwt.sign(
        {
            data: dataUser,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '3d' },
    );
    return token;
};

const verifyToken = (token) => {
    const dataReturn = {};
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        jwt.verify(token, process.env.JWT_SECRET_KEY, { ignoreExpiration: true });
                        dataReturn.isValidToken = false;
                        dataReturn.data = {};
                        dataReturn.message = message.tokenExpired;
                        resolve(dataReturn);
                    } else {
                        reject(err); // Xử lý các lỗi khác
                    }
                    return;
                }

                const accountUser = await db.User.findOne({
                    where: {
                        email: decoded.data.email,
                    },
                });
                if (accountUser) {
                    dataReturn.isValidToken = true;
                    dataReturn.userId = accountUser.dataValues.id;
                    resolve(dataReturn);
                } else {
                    dataReturn.isValidToken = false;
                    dataReturn.data = {};
                    dataReturn.message = message.notFoundUser;
                    resolve(dataReturn);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createToken,
    verifyToken,
};
