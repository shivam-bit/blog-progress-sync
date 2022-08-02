const { Schema, model, Types, Decimal128 } = require('mongoose');
const dayjs = require('dayjs');
const APIError = require('../../utils/APIError');
const {
    ROLES,
    NO_RECORD_FOUND,
    NOT_FOUND,
    BAD_REQUEST,
    VALIDATION_ERROR,
    INVALID_CREDENTIALS,
    UNAUTHORIZED,
    EMAIL_EXIST,
} = require('../../utils/constants');
const contentModel = require('./content');
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

// BlogModel.pre('save', async function save(next) {
//     try {
//         const contentBlocks = await contentModel
//             .find({
//                 parent_blog: this._id,
//             })
//             .exec();
//         console.log('🚀 ~ file: blog.js ~ line 73 ~ save ~ contentBlocks', contentBlocks);
//         if (contentBlocks.length === 0) {
//             return next();
//         }
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });

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
    async get(id) {
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
            .exec();
        if (!blog) throw new APIError({ message: NO_RECORD_FOUND, status: NOT_FOUND });
        return blog;
    },
};

/**
 * @typedef User
 */
module.exports = model('blogs', BlogModel);
