const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


 module.exports.authUser = async (req, res, next) => {
    const taken = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!taken) {
        return res.status(401).json({message: 'Unauthorized'});
        
    }
    const isblacklisted = await BlacklistTokenModel.findOne({ token: taken });

    if (isblacklisted) {
        return res.status(401).json({message: 'unauthorized '});
    }
    try {
        const decoded = jwt.verify(taken, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        req.user = user;

        return next();
    } catch (err) {

        return res.status(401).json({message: 'Unauthorized'});
    }
    
 }