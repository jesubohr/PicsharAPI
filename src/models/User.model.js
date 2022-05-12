const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
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
    requests: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    acceptedRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    deniedRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    savedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bycrypt.genSalt(10);
    return await bycrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async (password) => {
    return await bycrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
