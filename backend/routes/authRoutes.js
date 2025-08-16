const router = require('express').Router();
const auth = require('../middleware/auth.js');
const ctrl = require('../controllers/authController.js');

router.post('/register', ctrl.validateRegister, ctrl.register);
router.post('/login', ctrl.validateLogin, ctrl.login);
router.get('/me', auth, ctrl.me);

router.post('/refresh', ctrl.validateRefresh, ctrl.refresh);
router.post('/logout', auth, ctrl.validateLogout, ctrl.logout);

router.post('/request-reset', ctrl.validateRequestReset, ctrl.requestReset);
router.post('/reset-password', ctrl.validateResetPassword, ctrl.resetPassword);

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { register, login, getCurrentUser } = require('../controllers/userController');
// const protect = require('../middleware/authMiddleware');

// router.post('/register', register);
// router.post('/login', login);
// router.get('/me', protect, getCurrentUser);

// module.exports = router;
