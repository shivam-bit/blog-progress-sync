const { Schema, model, Types } = require('mongoose');
const APIError = require('../../utils/APIError');
const { NO_RECORD_FOUND, NOT_FOUND, VALIDATION_ERROR } = require('../../utils/constants');

/**
 * Blog Schema
 * @private
 */
const BlogModel = new Schema(
    {
        heading: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: Schema.ObjectId,
            ref: 'users',
            required: true,
        },
        increment_value: {
            type: Number,
            default: 0,
        },
        release: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    },
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

BlogModel.virtual('content_blocks', {
    ref: 'contents',
    localField: '_id',
    foreignField: 'parent_blog',
    justOne: false,
});

BlogModel.virtual('progress', {
    ref: 'progresses',
    localField: '_id',
    foreignField: 'blog_id',
    justOne: false,
});

/**
 * Blog Model Methods
 */
BlogModel.method({
    transform() {
        const transformed = {};
        const fields = ['id', 'heading', 'release', 'increment_value', 'createdAt', 'updatedAt'];
        fields.forEach((field) => {
            transformed[field] = this[field];
        });
        return transformed;
    },
});

/**
 * Statics
 */
BlogModel.statics = {
    /**
     * Get user
     *
     * @param {blogId} id - The id of blog.
     * @returns {Promise<blog, APIError>}
     */
    async get(id, userId) {
        if (!Types.ObjectId.isValid(id)) {
            throw new APIError({
                message: VALIDATION_ERROR,
                errors: [
                    {
                        field: 'id',
                        location: 'params',
                        messages: 'Please enter valid Blog ID',
                    },
                ],
                status: NOT_FOUND,
            });
        }
        const blog = await this.findById(id)
            .lean()
            .populate('content_blocks', 'content_type value -parent_blog')
            .populate('progress', 'progress_value time_spent -blog_id -user_id', { user_id: userId })
            .exec();
        if (!blog) throw new APIError({ message: NO_RECORD_FOUND, status: NOT_FOUND });
        return blog;
    },
};

/**
 * @typedef User
 */
module.exports = model('blogs', BlogModel);
