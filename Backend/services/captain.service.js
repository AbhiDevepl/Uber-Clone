const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    fistname, lastname, email, password, vehicleType, capacity, color, plate
}) => {
    if (!fistname || !email || !password || !vehicleType || !capacity || !color || !plate) {
        throw new Error('All fields are required');
    }

    const captain = captainModel.create({
        fullname: {
            firstname: firstname,
            lastname: lastname
        },
        email,
        password,
        vehicle: {
            vehicleType,
            capacity,
            plate,
            color
        }
    });

    return captain;
}