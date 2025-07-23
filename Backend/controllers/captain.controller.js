const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/BlacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password,
            vehicleType: vehicle.vehicleType,
            capacity: vehicle.capacity,
            color: vehicle.color,
            plate: vehicle.plate
        });

        const token = captain.generateAuthToken();

        res.status(201).json({ token, captain });
    } catch (error) {
        next(error);
    }
};

module.exports.loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Email or Password' });
        }

        const token = captain.generateAuthToken();
        res.cookie('token', token);

        res.status(200).json({ token, captain });
    } catch (error) {
        next(error);
    }
};

module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        const captain = await captainModel.findById(req.user.id);
        res.status(200).json({ captain });
    } catch (error) {
        next(error);
    }
};

module.exports.updateLocation = async (req, res, next) => {
    try {
        const { lat, lng } = req.body;
        const captain = await captainModel.findByIdAndUpdate(
            req.user.id,
            { location: { lat, lng } },
            { new: true }
        );
        res.status(200).json({ captain });
    } catch (error) {
        next(error);
    }
};

module.exports.updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const captain = await captainModel.findByIdAndUpdate(
            req.user.id,
            { status },
            { new: true }
        );
        res.status(200).json({ captain });
    } catch (error) {
        next(error);
    }
};