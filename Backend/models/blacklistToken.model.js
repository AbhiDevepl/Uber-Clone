const mongoose = require('mongoose');

const BlacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 1 day in seconds
    }
});


module.exports = mongoose.model('BlacklistToken', BlacklistTokenSchema);