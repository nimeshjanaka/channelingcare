const Billing = require('../model/Billing');
const Patient = require('../model/Patient');

// Create a new billing record

exports.createBilling = async(req, res) => {
    try {
        const {patient,type,items,paidAmount} = req.body;
        const patientExists = await Patient.findById(patient);
        if(!patientExists) {
            return res.status(404).json({ message: "Patient not found" });

            const totalAmount = items.reduce((acc, item) => acc + item.total,0);

            // Determine payment status
            let paymentStatus = 'UNPAID';
            if(paidAmount >= totalAmount) {
                paymentStatus = 'PAID';
            } else if(paidAmount > 0 && paidAmount < totalAmount) {
                paymentStatus = 'PARTIALLY_PAID';

                const bill = await Billing.create({
                    patient,
                    type,
                    items,
                    totalAmount,
                    paidAmount: paidAmount || 0,
                    paymentStatus
                });
                res.status(201).json({
                    message: "Billing record created successfully",
                    bill,
                });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// Get all billing records

exports.getbills = async(req, res) => {
    try {
        const bills = await Billing.find().populate('patient');
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

// Get single billing record

exports.getbill = async(req, res) => {
    try {
        const bill = await Billing.findById(req.params.id).populate('patient');
        if(!bill) 
            return res.status(404).json({ message: "Billing record not found" });
        
        res.status(200).json(bill);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

// Update payment record

exports.updatePayment = async(req, res) => {
    try {
        const { paidAmount } = req.body;
        const bill = await Billing.findById(req.params.id);
        if(!bill) 
            return res.status(404).json({ message: "Billing record not found" });

        bill.paidAmount += Number(paidAmount);

        //Update payment status
        if(bill.paidAmount >= bill.totalAmount) {
            bill.paymentStatus = 'PAID';
        } else if(bill.paidAmount > 0 && bill.paidAmount < bill.totalAmount) {
            bill.paymentStatus = 'PARTIALLY_PAID';
        } else {
            bill.paymentStatus = 'UNPAID';
        }
        await bill.save();
        res.status(200).json({
            message: "Payment updated successfully",
            bill
        });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

// delete billing record

exports.deleteBill = async(req, res) => {
    try {
        const bill = await Billing.findByIdAndDelete(req.params.id);
        if(!bill) 
            return res.status(404).json({ message: "Billing record not found" });

        res.status(200).json({ message: "Billing record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}