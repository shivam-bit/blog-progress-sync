const { Create, Update, ProgressAlreadyExist, ProgressGettingDecreased } = require('../service/progress');
const { OK, CREATED, PROGRESS_EXIST, PROGRESS_REDUCED, BAD_REQUEST } = require('../../utils/constants');
const APIError = require('../../utils/APIError');

/**
 * Create User Progress
 *
 * @public
 * @param {Request} req
 * @param {Response} res
 * @param {next} next
 */
exports.create = async (req, res, next) => {
    try {
        const { blogId } = req.params;
        const userPorgressAlreadyExist = await ProgressAlreadyExist(blogId, req.user._id);
        if (userPorgressAlreadyExist) {
            throw new APIError({ message: PROGRESS_EXIST, status: BAD_REQUEST });
        }
        const data = await Create({
            ...req.body,
            blog_id: blogId,
            user_id: req.user._id,
        });
        res.status(CREATED).json({ data, success: 'SUCCESS' });
    } catch (err) {
        next(err);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { progressId } = req.params;
        const isProgressReduced = await ProgressGettingDecreased(progressId, req.body.progress_value);
        if (isProgressReduced) {
            throw new APIError({ message: PROGRESS_REDUCED, status: BAD_REQUEST });
        }
        const data = await Update(progressId, req.body.progress_value);
        res.status(CREATED).json({ data, success: 'SUCCESS' });
    } catch (err) {
        next(err);
    }
};
