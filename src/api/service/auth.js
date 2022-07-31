const dayjs = require('dayjs');
const User = require('../models/user');
// const RefreshToken = require('../models/refresh-token');
const { jwtExpirationInterval } = require('../../config/env-vars');

/**
 * Return Formated Object With Tokens
 * @private
 *
 * @param {Object} user
 * @param {String} accessToken
 * @returns {Object} {tokenType, accessToken, refreshToken, expiresIn}
 */
const generateTokenResponse = (user, accessToken) => {
    const tokenType = 'Bearer';
    const refreshToken = RefreshToken.generate(user);
    const expiresIn = dayjs().add(jwtExpirationInterval, 'minutes');
    return {
        tokenType,
        accessToken,
        refreshToken,
        expiresIn,
    };
};

/**
 * Return's User Object and Jwt
 * if registration was successful
 *
 * @public
 * @param {Object} userData
 * @param {String} userData.email User Email
 * @param {String} userData.password User Password
 * @param {String} userData.name User Name
 *
 * @returns {Object} {token, user} User Object with Tokens
 */
exports.Register = async (userData) => {
    try {
        const user = new User(userData);
        const savedUser = await user.save();
        return { token: user.token(), user: savedUser.transform() };
    } catch (err) {
        throw User.checkDuplication(err);
    }
};

/**
 * Return's User Object and Jwt
 * if email and password was correct
 *
 * @public
 * @param {Object} userData
 * @param {String} userData.email User Email
 * @param {String} userData.password User password
 *
 * @returns {Object} {token, user} User Object with Tokens
 */
exports.Login = async (userData) => {
    const { user, accessToken } = await User.ValidateUserAndGenerateToken(userData);
    // const token = generateTokenResponse(user, accessToken);
    return { token: accessToken, user };
};

/**
 * Return's User Object and Jwt
 * if email and password was correct
 *
 * @public
 * @param {Object} userData
 * @param {String} userData.email User Email
 * @param {String} userData.password User password
 *
 * @returns {Object} {token, user} User Object with Tokens
 */
exports.Logout = async (userData) => {
    console.log('🚀 ~ file: auth.js ~ line 77 ~ exports.Logout= ~ userData', userData);
    // const { user, accessToken } = await User.ValidateUserAndGenerateToken(userData);
    // const token = generateTokenResponse(user, accessToken);
    // return { token: accessToken, user };
};
