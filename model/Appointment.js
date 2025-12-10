const mongoose = require('mongoose');
const Patient = require('./Patient');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({

    Patient : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Patient',
        required: true
    },
    doctor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true  
    },
    date:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enum:['booked','scheduled','completed','cancelled', 'no-show'],
        default:'booked'
    },
    type:{
        type:String,
        enum:['online','walk-in'],default:'walk-in'
    },
    notes:{
        type:String
    }
}, { timestamps: true
    
});

module.exports = mongoose.model('Appointment', AppointmentSchema);