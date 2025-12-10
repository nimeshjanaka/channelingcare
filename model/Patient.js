const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    patientId: {
        type: String,
        required: true,
        unique: true
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        
    },
    dob: {
        type: Date,
        
    },
    contactNumber: {
        type: String,
        
    },
    address: {
        type: String,
    },
    medicalHistory: [{
        type: String,
    }],
    documents:[
        {Filename: String, fileType: String, url: String, uploadDate: Date}
    ]
}, { timestamps: true });

module.exports = mongoose.model('Patient', UserSchema);