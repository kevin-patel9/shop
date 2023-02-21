const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    plot: {
        type: String
    },
    genres: {
        type: [String]
    },
    poster: {
        type: String
    },
    runtime: {
        type: Number
    },
    cast: {
        type: [String]
    },
    num_mflix_comments: {
        type: Number
    },
    title: {
        type: String
    },
    fullplot: {
        type: String
    },
    countries: {
        type: [String]
    },
    released: {
        type: Date
    },
    directors: {
        type: [String]
    },
    rated: {
        type: String
    },
    award: {
        type: {wins: Number, nominations: Number, text: String }
    },
    latestUpdate: {
        type: String
    },
    year: {
        type: Number
    },
    imbd: {
        type: {rating: Number, votes: Number, id: Number}
    },
    type: {
        type: String
    }
})

const Movies = mongoose.model('movies', movieSchema);

module.exports.Movies = Movies;