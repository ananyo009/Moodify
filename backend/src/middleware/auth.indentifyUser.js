
const jwt = require('jsonwebtoken')

const blacklistModel = require('../model/blacklist.model')  

const redis = require('../config/cache')

async function identifyUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message:"invalid token"
        })
    }

    const isTokenblacklisted = await redis.get(token) //blacklistModel.findOne({token})

    if(isTokenblacklisted) {
        return res.status(401).json({
            message:"Invalid token"
        })
    }
    

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message:"invalid token"
        })

    }
}

module.exports = identifyUser