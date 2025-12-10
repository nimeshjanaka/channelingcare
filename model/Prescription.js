const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({ 
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
    medicines: [{
        medicine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Medicine',
        },
        dosage: 
            String,
            
        
        quantity: 
             Number,
            
        
        duration: 
            String,
           
    }  
    ],
    notes: {
        type: String,
        
    }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);