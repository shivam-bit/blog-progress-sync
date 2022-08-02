const { Create } = require('../service/progress');
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
        const { blogId } = req.params;
        const data = await Create({
            ...req.body,
            blog_id: blogId,
            user_id: req.user._id
        });
        res.status(CREATED).json({ data, success: 'SUCCESS' });
    } catch (err) {
        next(err);
    }
};
