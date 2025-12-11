const express = require('express');
const router = express.Router();

const {
    createAppointment,
    getAppointments,
    getAppointment,
    updateAppointment,
    updateStatus,
    deleteAppointment
} = require('../controller/AppoinmentController');

const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.use(auth);

// Admin only create / delete routes
router.post('/', adminOnly, createAppointment);
router.delete('/:id', adminOnly, deleteAppointment);

// admin & doctor can update routes
router.put('/:id', adminOnly, updateAppointment);
router.put('/:id/status', adminOnly, updateStatus);

// General routes
router.get('/', getAppointments);
router.get('/:id', getAppointment);

module.exports = router;