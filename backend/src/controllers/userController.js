const { json } = require('sequelize');
const { registerAccount, loginAccount, getUserCurrent } = require('../services/userService');

// Đăng ký tài khoản
const postRegisterAccount = async (req, res) => {
    try {
        const { email, lastName, firstName, birthday, password, roleId } = req.body;
        const result = await registerAccount(email, lastName, firstName, birthday, password, roleId);
        return res.status(200).json(result);
    } catch (error) {
        const dataReturn = {};
        dataReturn.error = error.message;
        return res.status(500).json(dataReturn);
    }
};

// Đăng nhập tài khoản
const postLoginAccount = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await loginAccount(email, password);
        return res.status(200).json(result);
    } catch (error) {
        const dataReturn = {};
        dataReturn.error = error.message;
        return res.status(500).json(dataReturn);
    }
};

const ctrUserCurrent = async (req, res) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    try {
        const result = await getUserCurrent(token);
        return res.status(200).json(result);
    } catch (error) {
        const dataReturn = {};
        dataReturn.error = error.message;
        return res.status(500).json(dataReturn);
    }
};

module.exports = {
    postRegisterAccount,
    postLoginAccount,
    ctrUserCurrent,
};
