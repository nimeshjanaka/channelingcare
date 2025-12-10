const mongoose = require('mongoose');
const Patient = require('./Patient');
const Schema = mongoose.Schema;

const LabTestSchema = new Schema({

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
    testName:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enum:['pending','sample_collected','completed','processing'],
        default:'pending'
    },
    reportFile:{type:String},
    updateDate:{type:Date},
}, { timestamps: true
    
});

module.exports = mongoose.model('LabTest', LabTestSchema);