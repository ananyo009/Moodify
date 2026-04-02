const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    songUrl: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mood: {
            type: String,
            enums: {
                values: ['happy', 'sad', 'surprised'],
                message: "Enum this is"
            }
    }
    })

const SongModel = mongoose.model('Song', songSchema);

module.exports = SongModel;