const mongoose = require('mongoose')

const BlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, 'token is required']
    }
},{
        timestamps:true
    }
)

const blacklistModel = mongoose.model("blacklist", BlacklistSchema)

module.exports = blacklistModel