const userModel = require('../model/user.model')

const jwt = require('jsonwebtoken')

const redis = require('../config/cache')

const blacklistModel = require('../model/blacklist.model')

const bcrypt = require('bcryptjs')
const { get } = require('mongoose')

async function register(req,res) {
    const { email, username, password } = req.body
    
    const isAlreadyregistered = await userModel.findOne({
        $or: [
            { username },
            { email}
        ]
    })

    if (isAlreadyregistered) {
        return res.status(400).json({
            message:"user already exists , please login"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
         email,
        password:hash
    })

    const token = jwt.sign({
        userid: user._id,
        username:user.username
    }, process.env.JWT_SECRET,
        {
        expiresIn:"3d"
        })
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Required for HTTPS (Render uses HTTPS)
      sameSite: "none", // Required for cross-domain cookies
    });

    return res.status(201).json({
        message: "user registered successfully",
        user: {
            userid: user._id,
            username: user.username,
            email:user.email
        }
    })
}

async function login(req,res) {
    const { username, email, password } = req.body
    
    const user = await userModel.findOne({
        $or: [
            { email },
            {username}
        ]
    })

    if (!user) {
        return res.status(400).json({
            message:"user does not exist"
        })
    }

    const isPassword = await bcrypt.compare(password, user.password)
    
    if (!isPassword) {
        return res.status(401).json({
            message:"invalid password",
        })
    }

    const token = jwt.sign({
        userid: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn:"3d"
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Required for HTTPS (Render uses HTTPS)
      sameSite: "none", // Required for cross-domain cookies
    });
    
    return res.status(200).json({
        message: "login successful",
        user: {
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}

async function getUser(req, res){
    
    const user = await userModel.findById(req.user.userid).select("-password")

    if (!user) {
        return res.status(404).json({
            message:"user not found"
        })
    }

    return res.status(200).json({
        message: "user found successfully",
        user
    })
}


async function logout(req, res) {
    const token = req.cookies.token;

    res.clearCookie("token")

    await redis.set(token, Date.now().toString(),"EX",60*60)

    res.status(201).json({
        message:"logout successful"
    })
}


module.exports = {
    register,
    login,
    getMe: getUser,
    logout
}