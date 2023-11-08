const db = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { message } = require('../messages/message');
const { getToken } = require('../controllers/authController');
const salt = bcrypt.genSaltSync(10);

// Kiểm tra user đã đủ tuổi chưa (age >= 12)
const checkEnoughAge = (birthday) => {
    const today = new Date();
    const birthdayDate = new Date(birthday);
    const timeDiff = today - birthday;

    let age = Math.floor(today.getFullYear() - birthdayDate.getFullYear());

    const m = today.getMonth() - birthdayDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthdayDate.getDate())) {
        age--;
    }
    if (age >= 12) {
        return true;
    } else {
        return false;
    }
};

// Kiểm tra mật khẩu đủ bảo mật chưa
const securityPassword = (password) => {
    const dataReturn = {};
    if (password.length < 8) {
        dataReturn.message = message.passwordShort;
    } else if (!/[A-Z]/.test(password)) {
        dataReturn.message = message.passwordUppercase;
    } else if (!/\d/.test(password)) {
        dataReturn.message = message.passwordContainNumber;
    } else if (!/[!@#$%^&*]/.test(password)) {
        dataReturn.message = message.passwordSpecialCharacter;
    } else if (/\s/.test(password)) {
        dataReturn.message = message.passwordSpaceLetter;
    } else {
        dataReturn.isStrongPassword = true;
    }
    return dataReturn;
};

const checkValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailRegex.test(email);
    return isValidEmail;
};

// Kiểm tra các field không được để trống và đúng định dạng
const checkFieldRegister = async (email, lastName, firstName, birthday, password) => {
    const dataReturn = {};
    const isValidEmail = checkValidEmail(email);
    const isEnoughAge = checkEnoughAge(birthday);
    const checkEmail = await checkDuplicateEmail(email);
    const checkSecurityPassword = securityPassword(password);
    dataReturn.isGoodFileds = false;

    if (!email) {
        dataReturn.message = message.emailEmpty;
    } else if (!firstName) {
        dataReturn.message = message.firstNameEmpty;
    } else if (!lastName) {
        dataReturn.message = message.lastNameEmpty;
    } else if (!password) {
        dataReturn.message = message.passwordEmpty;
    } else if (!birthday) {
        dataReturn.message = message.birdayEmpty;
    } else if (!isValidEmail) {
        dataReturn.message = message.notValidEmail;
    } else if (!isEnoughAge) {
        dataReturn.message = message.notEnoughAge;
    } else if (checkEmail) {
        dataReturn.message = message.duplicateEmail;
    } else if (!checkSecurityPassword.isStrongPassword) {
        dataReturn.message = checkSecurityPassword.message;
    } else {
        dataReturn.isGoodFileds = true;
    }
    return dataReturn;
};

// Mã hóa mật khẩu
const encryptionPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
};

const checkDuplicateEmail = async (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const duplicate = await db.User.findOne({
                where: { email: email },
            });
            resolve(duplicate);
        } catch (error) {
            reject(error);
        }
    });
};

// Xử lý đăng ký tài khoản
const registerAccount = async (email, lastName, firstName, birthday, password, roleId) => {
    const hashPassword = encryptionPassword(password);
    const checkInfoField = await checkFieldRegister(email, lastName, firstName, birthday, password);
    const dataReturn = {};
    if (!checkInfoField.isGoodFileds) {
        dataReturn.message = checkInfoField.message;
        return dataReturn;
    }
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.create({
                email: email,
                lastName: lastName,
                firstName: firstName,
                birthday: birthday,
                password: hashPassword,
                roleId: roleId,
            });
            dataReturn.errCode = 0;
            dataReturn.message = message.successRegister;
            resolve(dataReturn);
        } catch (error) {
            reject(error);
        }
    });
};

// Xử lý đăng nhập tài khoản
const loginAccount = (email, password) => {
    const dataReturn = {};
    const isValidEmail = checkValidEmail(email);
    if (!isValidEmail) {
        dataReturn.message = message.notValidEmail;
        return dataReturn;
    }
    return new Promise(async (resolve, reject) => {
        try {
            const dataUser = await db.User.findOne({
                where: {
                    email: email,
                },
            });
            if (dataUser) {
                const isCorrectPassword = checkPasswordLogin(password, dataUser.password);
                if (isCorrectPassword) {
                    dataReturn.message = message.successLogin;
                    dataReturn.token = getToken(dataUser);
                } else {
                    dataReturn.message = message.wrongPassword;
                }
            } else {
                dataReturn.message = message.notExistEmail;
            }

            resolve(dataReturn);
        } catch (error) {
            reject(error);
        }
    });
};

// Kiểm tra mật khẩu và so sánh mk mã hóa và mk người dùng nhập vào
const checkPasswordLogin = (password, passwordHash) => {
    const isCorrectPassword = bcrypt.compareSync(password, passwordHash);
    return isCorrectPassword;
};

const getUserCurrent = (token) => {
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
                    include: {
                        model: db.Song,
                        as: 'songs',
                    },
                });
                if (accountUser) {
                    dataReturn.isValidToken = true;
                    dataReturn.user = accountUser;
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
    registerAccount,
    loginAccount,
    getUserCurrent,
};
