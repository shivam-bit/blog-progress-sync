const jwt = require('jsonwebtoken');
const User = require('../api/models/user');
const { cookieExpireTime, jwtSecret } = require('../config/env-vars');
const { ROLES, UNAUTHORIZED, LOGGED_IN, FORBIDDEN } = require('../utils/constants');
const APIError = require('../utils/APIError');

// check if user is authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            const apiError = new APIError({
                message: 'Unauthorized',
                status: UNAUTHORIZED,
            });
            return next(apiError);
        }
        const decoded = jwt.verify(token, jwtSecret);
        req.user = await User.findById(decoded.sub);
        console.log('🚀 ~ file: auth.js ~ line 21 ~ exports.isAuthenticatedUser= ~ decoded', req.user);
        next();
    } catch (error) {
        const apiError = new APIError({
            message: error ? error.message : 'Unauthorized',
            status: UNAUTHORIZED,
            stack: error ? error.stack : undefined,
        });
        return next(apiError);
    }
};

// handling user roles
exports.authorizeRoles =
    (...roles) =>
    (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new errorHandlerClass(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    };
