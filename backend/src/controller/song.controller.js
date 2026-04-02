const songModel = require('../model/songs.model');

const id3 = require('node-id3');

const storageService = require('../services/storage.services')   

async function uploadSong(req, res) {
    const Songbuffer = req.file.buffer;
    
    console.log(Songbuffer)

    const tags = id3.read(Songbuffer);

    const {mood} = req.body

    console.log(tags)

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile(
            Songbuffer,
            tags.title + ".mp3",
            "/moodify/songs"
        ),
        storageService.uploadFile(
            tags.image.imageBuffer,
            tags.title + ".jpeg",
            "/moodify/posters"
        )
    ]);

    const song = await songModel.create({
        songUrl: songFile.url,
        posterUrl: posterFile.url,
        title: tags.title,
        mood:mood
    })

    return res.status(201).json({
        message: "Song uploaded successfully",
        song
    })
}

async function getSongs(req, res) {
    const { mood } = req.query;

    const song = await songModel.find({ mood: mood });

    return res.status(200).json({
        message: "Songs fetched successfully",
        song
    })
}

module.exports = {
    uploadSong,
    getSongs
}