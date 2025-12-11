const Admission = require('../models/Admission');
const Patient = require('../models/Patient');

// Create a new admission
exports.createAdmission = async(req, res) => {
    try {
        const { Patient, bedNumber, ward, admissionDate } = req.body;

        const patientExists = await patient.findById(Patient);
        if(!patientExists) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const addmission = await Admission.create({
            patient,
            bedNumber,
            ward,
            admissionDate
        })
        res.status(201).json({
            message: "Admission created successfully",
         })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Get all admissions 

exports.getAdmissions = async(req, res) => {
    try {
        const admissions = await Admission.find().populate('Patient');
        res.status(200).json(admissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get single admission
exports.getAdmission = async(req, res ) => {
    try {
        const admission = await Admission.findById(req.params.id).populate('Patient');

        if(!admission) {
            return res.status(404).json({ message: "Admission not found" });
        }
        res.status(200).json(admission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update an admission
exports.updateAdmission = async(req, res) => {
    const updates = req.body;
    try {
        const admission = await Admission.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('Patient');

        if(!admission) {
            return res.status(404).json({ message: "Admission not found" });
        }
        res.status(200).json(admission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//add progress note

exports.addProgressNote = async(req, res) => {
    try {
        const { note } = req.body;

        const admission = await Admission.findById(req.params.id);
        if(!admission) {
            return res.status(404).json({ message: "Admission not found" });
        }

        admission.progressNote.push({ note });
        await admission.save();

        res.status(200).json({ message: "Progress note added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Discharge Patient

exports.dischargePatient = async(req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);
        if(!admission) {
            return res.status(404).json({ message: "Admission not found" });
        }

        admission.dischargeDate = new Date();
        await admission.save();

        res.status(200).json({ message: "Patient discharged successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
   
//delete admission

exports.deleteAdmission = async (req, res) => {
    try {
        const admission = await Admission.findByIdAndDelete(req.params.id);

        if (!admission) return res.status(404).json({ message: "Admission not found" });

        res.status(200).json({ message: "Admission deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};