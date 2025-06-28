const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    commented_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    deleted_at: {
        type: Date,
    }
});

const commentSchema = new mongoose.Schema({
    messages: [messageSchema],
}, { timestamps: true });

module.exports = mongoose.model('comments', commentSchema);
