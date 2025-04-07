const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    team_members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
