const dayjs = require('dayjs');
const Blog = require('../models/blog');

/**
 * Return's Blog Object
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
exports.Create = async (blogData) => {
    try {
        const blog = new Blog(blogData);
        const savedBlog = await blog.save();
        return { blog: savedBlog.transform() };
    } catch (err) {
        console.log('🚀 ~ file: blog.js ~ line 43 ~ exports.Create= ~ err', err);
        throw err;
    }
};

/**
 * Get Blog By ID
 * @public
 *
 * @param {ObjectId} id mongoose Object id of blog
 * @returns {Promise<Blog>} blog data
 */
exports.Get = async (blogId) => Blog.get(blogId);

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
