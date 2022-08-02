const { Schema, model, Types } = require('mongoose');
const APIError = require('../../utils/APIError');
const {
    CONTENT_TYPES,
    NO_RECORD_FOUND,
    NOT_FOUND,
    VALIDATION_ERROR,
} = require('../../utils/constants');

/**
 * Progress Schema
 * @private
 */
const ProgressModel = new Schema(
    {
        progress_value: {
            type: Number,
            default: 0,
        },
        user_id: {
            type: Schema.ObjectId,
            ref: 'users',
            required: true,
        },
        blog_id: {
            type: Schema.ObjectId,
            ref: 'blogs',
            required: true,
        },
        time_spent: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

/**
 * Statics
 */
ProgressModel.statics = {
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
                        messages: 'Invalid progress Object ID',
                    },
                ],
                status: NOT_FOUND,
            });
        }
        const progressObject = await this.findById(id).exec();
        if (!progressObject) throw new APIError({ message: NO_RECORD_FOUND, status: NOT_FOUND });
        return progressObject;
    },
};

/**
 * @typedef Content
 */
module.exports = model('progresses', ProgressModel);
