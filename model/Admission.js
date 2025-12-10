const mongoose = require('mongoose');
const Patient = require('./Patient');
const Schema = mongoose.Schema;

const AdmissionSchema = new Schema({ 
    Patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    bedNumber: {
        type: String,
        required: true
    },
    admissionDate: {
        type: Date,
        default: Date.now
    },
    ward: {
        type: String,
        required: true
    },
    dischargeDate: {
        type: Date
    },
    progressNote :[{
        note: String,
        date: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Admission', AdmissionSchema);