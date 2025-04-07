const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['admin', 'user', 'viewer'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
