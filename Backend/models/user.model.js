const mongoose = require('mongoose');
const { Socket } = require('node:dgram');
const brcypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [2, 'First name must be at least 2 characters long'],
        },
         lastname: {
            type: String,
            minlength: [2, 'last must be at least 2 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        Select: false,
    },
    socketId: {
        type: String,
    },
})


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}


userSchema.methods.comparePassword = async function(password) {
   return await brcypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await brcypt.hash(password, 10);
}


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;