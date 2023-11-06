const { createToken, verifyToken } = require('../services/tokenService');

const getToken = (dataUser) => {
    try {
        const token = createToken(dataUser);
        return token;
    } catch (error) {
        const dataReturn = {};
        dataReturn.error = error.message;
        return res.status(500).json(dataReturn);
    }
};

const handleCheckToken = async (token) => {
    try {
        const result = await verifyToken(token);
        return result;
    } catch (error) {
        const dataReturn = {};
        dataReturn.error = error.message;
        return res.status(500).json(dataReturn);
    }
};

module.exports = {
    getToken,
    handleCheckToken,
};
