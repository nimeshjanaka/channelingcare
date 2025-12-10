const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    phone : {
        type: String
    } ,
    role: {
        type: String,
        enum: ['admin', "doctor","nurse","lab", "receptionist","phamacist"],
        required: true
    },
    password : {
        type: String,
        required: true
    },
    profileImage : {
        type: String
}, 
resetToken: {
        type: String
    },
    resetTokenExpiry: {
        type: Date
    },
    specialization: {
        type: String
    },
    Qualification: {
        type: String
    },
    experience: {
        type: Number
    },
    availability: [
        {day: String, startTime: String, endTime: String}
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);