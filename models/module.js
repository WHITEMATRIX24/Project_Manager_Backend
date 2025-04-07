const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    parent_module_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
        default: null
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    is_leaf_node: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Module', moduleSchema);
