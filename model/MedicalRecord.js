const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalRecordSchema = new Schema({ 
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    visitDate: {
        type: Date,
        default: Date.now
    },
    diagnosis: {
        type: String,
    },
    testResult: [{
        testName: String,
        fileURL: String,
        uploadedAt: Date
    }]
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', MedicalRecordSchema);