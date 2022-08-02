const { Login, Logout, Register } = require('../service/auth');
const { OK, CREATED } = require('../../utils/constants');

/**
 * Authenticate User
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
exports.login = async (req, res, next) => {
    try {
        const data = await Login(req.body);
        // options for cookies
        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.status(OK).cookie('token', data.token, options).json({ data, success: 'SUCCESS' });
    } catch (err) {
        next(err);
    }
};

/**
 * Logout User
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
exports.logout = async (req, res, next) => {
    try {
      console.log("🚀 ~ file: auth.js ~ line 35 ~ exports.logout= ~ req", req.headers)
        // const data = await Logout(req.body);
        // res.status(OK).json({ data, success: 'SUCCESS' });
    } catch (err) {
        next(err);
    }
};

/**
 * Register a new User
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
exports.register = async (req, res, next) => {
    try {
        const data = await Register(req.body);
        res.status(CREATED).json({ data, success: 'SUCCESS' });
    } catch (err) {
        next(err);
    }
};
