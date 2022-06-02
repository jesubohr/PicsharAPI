const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    canSeeLikes: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bycrypt.genSalt(10);
    return await bycrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
    return await bycrypt.compare(password, this.password);
};

module.exports = mongoose.models['User'] || mongoose.model('User', UserSchema);
