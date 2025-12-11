const express = require('express');
const router = express.Router();

const {
    createAdmission,
    getAdmissions,
    getAdmission,
    updateAdmission,
    addProgressNote,
    dischargePatient,
    deleteAdmission
} = require('../controller/AdmissionController');

//Middleware
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.use(auth);

//Admin only create/update/delete routes
router.post('/', adminOnly, createAdmission);
router.put('/:id', adminOnly, updateAdmission);
router.delete('/:id', adminOnly, deleteAdmission);
router.put('/:id/discharge', adminOnly, dischargePatient);

//General routes
router.get('/', getAdmissions);
router.get('/:id', getAdmission);
router.put('/:id/progress-note', addProgressNote);

module.exports = router;