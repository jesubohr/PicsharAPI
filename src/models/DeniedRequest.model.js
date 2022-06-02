const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeniedRequestSchema = new Schema({
    userOrigin : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userDestination : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

module.exports = mongoose.model('DeniedRequest', DeniedRequestSchema);