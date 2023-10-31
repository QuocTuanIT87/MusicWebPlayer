const { json } = require('sequelize');
const { registerAccount, loginAccount, checkPasswordLogin } = require('../services/userService');

// Đăng ký tài khoản
const postRegisterAccount = async (req, res) => {
    try {
        const { email, lastName, firstName, birthday, password, roleId } = req.body;
        const result = await registerAccount(email, lastName, firstName, birthday, password, roleId);
        return res.status(200).json(result);
    } catch (error) {}
};

// Đăng nhập tài khoản
const postLoginAccount = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await loginAccount(email, password);
        return res.status(200).json(result);
    } catch (error) {}
};

module.exports = {
    postRegisterAccount,
    postLoginAccount,
};