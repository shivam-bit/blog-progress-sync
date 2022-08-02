const app = require('express').Router();
const Validate = require('express-validation');
const controller = require('../controller/blog');
const { isAuthenticatedUser } = require('../../middleware/auth');
// const { Login, Register } = require('../validations/auth');

/**
 * @api {post} v1/blog/create Create
 * @apiDescription Create a new blog
 * @apiVersion 1.0.0
 * @apiName Create Blog
 * @apiGroup Blog
 * @apiPermission public
 *
 */
app.route('/create').post(isAuthenticatedUser, controller.create);
app.route('/view/:blogId').get(isAuthenticatedUser, controller.view);

module.exports = app;
