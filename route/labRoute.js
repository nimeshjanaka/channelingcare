const express = require('express');
const router = express.Router();

const {
    createLabTest,
    getLabTests,
    getLabTest,
    updateStatus,
    uploadReport,
    deleteLabTest,
    assignTechnician
} = require('../controller/LabTestController');

const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.use(auth);

// Admin only routes
router.post('/', adminOnly, createLabTest);
router.delete('/:id', adminOnly, deleteLabTest);

// General routes 
router.get('/', getLabTests);
router.get('/:id', getLabTest);

//assign technician and update status
router.put('/:id/assign-technician', assignTechnician);

// update test status
router.put('/:id/status', updateStatus);


// upload test report
router.put('/:id/upload-report', uploadReport);

module.exports = router;