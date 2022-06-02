const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikedPostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
}, { timestamps: true });

module.exports = mongoose.model('LikedPost', LikedPostSchema);