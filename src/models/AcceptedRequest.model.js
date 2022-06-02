const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AcceptedRequestSchema = new Schema({
    userOrigin : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userDestination : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

module.exports = mongoose.model('AcceptedRequest', AcceptedRequestSchema);