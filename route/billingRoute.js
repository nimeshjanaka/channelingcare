const express = require('express');
const router = express.Router();

const {
    createBilling,
    getBillings,
    getBilling,
    updateBilling,
    deleteBilling
} = require('../controller/BillingController');

const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.use(auth);

// Admin only routes
router.post('/', adminOnly, createBilling);
router.delete('/:id', adminOnly, deleteBilling);

// General access (doctor,nurse,receptionist) routes
router.get('/', getBillings);
router.get('/:id', getBilling);
router.put('/:id', updateBilling);

// payment update (cashier / admin)
router.put('/:id/payment', adminOnly, updatePayment);

module.exports = router;