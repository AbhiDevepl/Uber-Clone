const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const { authUser } = require('../middlewares/auth.middleware');
const { body } = require('express-validator');

// Validation middleware
const registerValidation = [
    body('fullname.firstname').isLength({ min: 2 }),
    body('fullname.lastname').isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']),
    body('vehicle.capacity').isInt({ min: 1 }),
    body('vehicle.color').isLength({ min: 3 }),
    body('vehicle.plate').isLength({ min: 3 })
];

const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
];

// Routes
router.post('/register', registerValidation, captainController.registerCaptain);
router.post('/login', loginValidation, captainController.loginCaptain);
router.get('/profile', authUser, captainController.getCaptainProfile);
router.put('/location', authUser, captainController.updateLocation);
router.put('/status', authUser, captainController.updateStatus);

module.exports = router;