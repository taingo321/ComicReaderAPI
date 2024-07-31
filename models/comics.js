const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image_url: {
        type: String,
        required: true,
    }
});

const chapterSchema = new mongoose.Schema({
    title: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    images: [imageSchema],
});

const comicSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            required: true,
        },
        thumbnailComic: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        view: {
            type: String,
            required: true,
        },
        rating: {
            type: String,
            required: true,
        },
        genres: [{
            type: String,
            ref: 'Genre',
            required: true,
        }],
        chapters: [chapterSchema]
});

const Comic = mongoose.model('Comic', comicSchema);
module.exports = Comic;