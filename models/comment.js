const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    id: String,
    comment: String,
    commented_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updated_at: Date,
    deleted_at: Date
});

module.exports = mongoose.model('Comment', commentSchema);
