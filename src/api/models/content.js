const { Schema, model, Types } = require('mongoose');
const APIError = require('../../utils/APIError');
const {
    CONTENT_TYPES,
    NO_RECORD_FOUND,
    NOT_FOUND,
    VALIDATION_ERROR,
} = require('../../utils/constants');

/**
 * Blog Schema
 * @private
 */
const ContentModel = new Schema(
    {
        content_type: {
            type: String,
            enum: CONTENT_TYPES,
            default: 'paragraph',
        },
        value: {
            type: String,
            required: true,
            trim: true,
        },
        parent_blog: {
            type: Schema.ObjectId,
            ref: 'blogs',
            required: true,
        },
    },
    { timestamps: true },
);

/**
 * Statics
 */
ContentModel.statics = {
    /**
     * Get content object
     *
     * @param {ObjectId} id - The objectId of content object.
     * @returns {Promise<Content, APIError>}
     */
    async get(id) {
        if (!Types.ObjectId.isValid(id)) {
            throw new APIError({
                message: VALIDATION_ERROR,
                errors: [
                    {
                        field: 'id',
                        location: 'request body',
                        messages: 'Invalid content ID',
                    },
                ],
                status: NOT_FOUND,
            });
        }
        const contentObject = await this.findById(id).exec();
        if (!contentObject) throw new APIError({ message: NO_RECORD_FOUND, status: NOT_FOUND });
        return contentObject;
    },
};

/**
 * @typedef Content
 */
module.exports = model('contents', ContentModel);
