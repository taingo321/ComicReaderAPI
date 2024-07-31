const mongoose = require('mongoose');

const adSchema = mongoose.Schema(
    {
        adName: {
            type: String,
            required: true,
        },
        startAd: {
            type: String,
            required: true,
        },
        endAd: {
            type: String,
            required: true,
        },
        thumbnailAd: {
            type: String,
            required: true,
        },
        linkAd: {
            type: String,
            required: true,
        },
});

const Ad = mongoose.model('Ad', adSchema);
module.exports = Ad;