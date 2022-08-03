const Content = require('../models/content');
const Blog = require('../models/blog');
const Progress = require('../models/progress');
/**
 * Return Count for content_blocks
 * @private
 *
 * @param {String} blogId
 * @returns {Number} contentBlocks count for a blog
 */
const getContentBlockCount = async (blogId) => {
    const contentBlocksCount = await Content.countDocuments({
        parent_blog: blogId,
    });
    return contentBlocksCount;
};

/**
 * Update increment value in blog
 * @private
 *
 * @param {String} blogId
 * @returns {Object} Updated Increment_value for a blog
 */
const updateBlogIncrementVal = async (blogId) => {
    const contentBlocksCount = await getContentBlockCount(blogId);
    const newIncrementValue = Number((100 / contentBlocksCount).toFixed(2));
    const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
            $set: { increment_value: newIncrementValue },
        },
        { new: true },
    ).exec();
    return {
        increment_value: updatedBlog.increment_value,
    };
};


module.exports = { getContentBlockCount, updateBlogIncrementVal };
