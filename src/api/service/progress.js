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
        console.log('🚀 ~ file: blog.js ~ line 43 ~ exports.Create= ~ err', err);
        throw err;
    }
};