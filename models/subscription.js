const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    subscription_plan: {
        type: String,
        enum: ['Basic', 'Standard', 'Premium'],
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    billing_cycle: {
        type: String,
        enum: ['Monthly', 'Quarterly', 'Yearly'],
        required: true
    },
    payment_method: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'Bank Transfer'],
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
