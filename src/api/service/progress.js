const Progress = require('../models/progress');
/**
 * Return's Content Object
 * if creation was successful
 *
 * @public
 * @param {Object} blogData
 * @param {String} blogData.heading Blog Heading
 * @param {String} blogData.author Blog AuthorId
 * @param {String} blogData.increment_value Blog increment progress by value
 * @param {String} blogData.release Blog Released
 *
 * @returns {Object} {blog} Blog Object
 */
exports.Create = async (progressData) => {
    try {
        const userProgress = new Progress(progressData);
        const savedUserProgress = await userProgress.save();
        return { progress: savedUserProgress };
    } catch (err) {
        return err;
    }
};

exports.Update = async (progressId, newIncrementValue) => {
    try {
        const updatedProgress = await Progress.findByIdAndUpdate(
            progressId,
            {
                $set: { progress_value: newIncrementValue },
            },
            { new: true },
        ).exec();
        return { updatedProgress };
    } catch (err) {
        return err;
    }
};

exports.ProgressAlreadyExist = async (blogId, userId) => {
    const userProgressCount = await Progress.countDocuments({
        blog_id: blogId,
        user_id: userId,
    });
    return userProgressCount !== 0;
};

exports.ProgressGettingDecreased = async (progressId, newProgressValue) => {
    const { progress_value } = await Progress.findById(progressId);
    console.log('🚀 ~ file: progress.js ~ line 50 ~ exports.ProgressGettingDecreased= ~ userProgress', progress_value);
    return progress_value > newProgressValue;
    // return userProgressCount !== 0;
};
