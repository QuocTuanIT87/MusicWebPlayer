const { createToken, verifyToken } = require('../services/tokenService');

const getToken = (dataUser) => {
    try {
        const token = createToken(dataUser);
        return token;
    } catch (error) {}
};

const handleCheckToken = async (token) => {
    try {
        const result = await verifyToken(token);
        return result;
    } catch (error) {}
};

module.exports = {
    getToken,
    handleCheckToken,
};
