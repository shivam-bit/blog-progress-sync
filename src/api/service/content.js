const Content = require('../models/content');
const { updateBlogIncrementVal } = require('./misc');
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
exports.Create = async (contentData) => {
    try {
        const contentBlock = new Content(contentData);
        const savedContent = await contentBlock.save();
        const blogId = contentData.parent_blog;
        await updateBlogIncrementVal(blogId);
        return { contentBlock: savedContent };
    } catch (err) {
        console.log('🚀 ~ file: blog.js ~ line 43 ~ exports.Create= ~ err', err);
        throw err;
    }
};

/**
 * Return's Blog Object
 * if deletion was successful
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
// exports.Update = async (blogData) => {
//     try {
//         const blog = Blog.updateOne({
//             _id:blogData._id
//         },{

//         })
//         const savedBlog = await blog.save();
//         return { blog: savedBlog };
//     } catch (err) {
//         console.log('🚀 ~ file: blog.js ~ line 43 ~ exports.Create= ~ err', err);
//         throw err;
//     }
// };
