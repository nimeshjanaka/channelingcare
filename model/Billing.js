const mongoose = require('mongoose');
const Patient = require('./Patient');
const Schema = mongoose.Schema;

const BillingSchema   = new Schema({
    Patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    type: {
        type: String,
        enum: ['OPD', 'IPD', 'PHAMACY', 'LAB_TEST'], 
        required: true
    },
    items: [
        {
            name: String,
            price: Number,
            quantity: Number,
            total: Number
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    paidAmount: {
        type: Number,
        default: 0
    },
    paymentStatus: {
        type: String,
        enum: ['UNPAID', 'PAID', 'PARTIALLY_PAID'],
        default: 'UNPAID'
    },
   
 }, { timestamps: true });

module.exports = mongoose.model('Billing', BillingSchema);