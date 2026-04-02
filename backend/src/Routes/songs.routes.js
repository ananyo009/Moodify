const { Router } = require('express');

const songModel = require('../model/songs.model');

const upload = require('../middleware/upload.middleware')

const controller = require('../controller/song.controller')

const songRouter = Router();



songRouter.post('/', upload.single('song'), controller.uploadSong)

songRouter.get('/',controller.getSongs)

module.exports = songRouter;