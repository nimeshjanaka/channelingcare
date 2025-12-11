const Appointment = require ('../models/Appointment');
const Patient = require ('../models/Patient');
const User = require ('../models/User');

// Create new appointment

exports.createAppointment = async (req, res) => {
    try {
        const { Patient: patientId, doctor: doctorId, date, time, type, notes } = req.body; 

        const patientExists = await Patient.findById(patientId);
        if(!patientExists) {
            return res.status(404).json({ message: "Patient not found" });
        }


        const doctorExists = await User.findById(doctorId);
        if(!doctorExists) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        const appointment = await Appointment.create({
            Patient: patientId,
            doctor: doctorId,
            date,
            time,
            type,
            notes
        });

        res.status(201).json({
            message: "Appointment created successfully",
            appointment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get all appointments

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('Patient').populate('doctor');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get single appointment

exports.getAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('Patient').populate('doctor');

        if(!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update an appointment

exports.updateAppointment = async (req, res) => {
    const updates = req.body;
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('Patient').populate('doctor');

        if(!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// change status of an appointment

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const appointment = await Appointment.findById(req.params.id);
        if(!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json({
            message: "Appointment status updated successfully",
            appointment,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete an appointment

exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);

        if(!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
