const { Create } = require('../service/content');
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
    console.log('🚀 ~ file: blog.js ~ line 13 ~ exports.create= ~ req', req.params);
    try {
        const { blogId } = req.params;
        const data = await Create({
            ...req.body,
            parent_blog: blogId,
        });
        res.status(CREATED).json({ data, success: 'SUCCESS' });
    } catch (err) {
        next(err);
    }
};
