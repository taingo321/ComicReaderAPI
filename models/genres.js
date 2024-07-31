const mongoose = require('mongoose');

const genreSchema = mongoose.Schema(
    {
        genreName: {
            type: String,
            required: true,
        },
});

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;