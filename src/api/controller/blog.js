const { Get,Create } = require('../service/blog');
const { OK, CREATED } = require('../../utils/constants');

/**
 * Create Blog
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
exports.create = async (req, res, next) => {
    try {
        const data = await Create({
            ...req.body,
            author: req.user._id,
        });
        res.status(CREATED).json({ data, success: 'SUCCESS' });
    } catch (err) {
        next(err);
    }
};

/**
 * Get Blog
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
exports.view = async (req, res, next) => {
    try {
        const data = await Get(req.params.blogId);
        res.status(CREATED).json({ data, success: 'SUCCESS' });
    } catch (err) {
        next(err);
    }
};

