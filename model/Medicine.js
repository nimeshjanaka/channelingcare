const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    expiryDate: {
        type: Date,
    },
    batchNumber: {
        type: String,
    },
    Stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    lowStockAlert: {
        type: Number,
        default: 10
    }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', MedicineSchema);