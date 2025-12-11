const express = require('express');
const router = express.Router();


const {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    updateUser,
    updateRole,
    generateResetToken,
    resetPassword,
    deleteUser
} = require('../controller/UserController');

//middleware

const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.post('/register', registerUser);
router.post('/login', loginUser);


//password reset routes
router.post('/generate-reset-token', generateResetToken);
router.post('/reset-password', resetPassword);

//protected routes
router.use(auth);

//Admin only routes
router.get('/', adminOnly, getUsers);
router.put('/:id/role', adminOnly, updateRole);
router.delete('/:id', adminOnly, deleteUser);

//Logged in user routes
router.get('/:id', getUser);
router.put('/:id', updateUser);

module.exports = router;