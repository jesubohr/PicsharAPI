const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    bio: {
        type: String,
        required: true
    },
    image_url: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
